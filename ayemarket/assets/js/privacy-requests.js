/**
 * AYE Marketplace — Privacy Requests (Account Deletion / Data Export / Data
 * Correction).
 *
 * Used by delete-account.html and privacy-center.html. Requires the user to
 * sign in with their real AYE Marketplace account (Firebase Auth) before
 * submitting anything — signing in IS the identity verification: only the
 * account owner can produce valid credentials for it. The signed-in uid is
 * attached to every request written to Firestore, and Firestore's own
 * security rules (see AYE_Marketplace/firestore.rules,
 * `match /privacyRequests/{requestId}`) independently enforce that a client
 * can only create a request for their own uid — this script trusting the
 * signed-in user is a UX convenience, not the actual security boundary.
 *
 * Nothing here deletes or exports anything by itself — every request lands
 * in Firestore as `status: 'pending'` and is only acted on after a human
 * admin reviews and approves it in the AYE Marketplace admin app.
 */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup, signOut
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
import {
  getFirestore, collection, addDoc, query, where, serverTimestamp, getDocs, orderBy, limit
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBRQorpBfp1IWtTmRYYkdLUtabyXuKXxLo',
  authDomain: 'aye-market.firebaseapp.com',
  projectId: 'aye-market',
  storageBucket: 'aye-market.firebasestorage.app',
  messagingSenderId: '562540833887',
  appId: '1:562540833887:web:b6cde1be05e650fa3b3fea',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function $(sel, root) { return (root || document).querySelector(sel); }
function show(el) { if (el) el.style.display = ''; }
function hide(el) { if (el) el.style.display = 'none'; }

function initPrivacyRequestWidget(root) {
  const type = root.getAttribute('data-request-type'); // 'deletion' | 'export' | 'correction'
  const signedOutView = $('[data-signed-out]', root);
  const signedInView = $('[data-signed-in]', root);
  const alreadyView = $('[data-already-pending]', root);
  const userChip = $('[data-user-chip]', root);
  const statusBox = $('.form-status', root);
  const emailForm = $('[data-email-signin-form]', root);
  const googleBtn = $('[data-google-signin]', root);
  const signOutBtn = $('[data-sign-out]', root);
  const submitForm = $('[data-request-form]', root);

  function setStatus(message, kind) {
    if (!statusBox) return;
    statusBox.textContent = message;
    statusBox.className = 'form-status show ' + (kind || 'error');
  }

  async function hasPendingRequest(uid) {
    const q = query(
      collection(db, 'privacyRequests'),
      where('uid', '==', uid),
      where('type', '==', type),
      where('status', '==', 'pending'),
      limit(1)
    );
    const snap = await getDocs(q);
    return !snap.empty;
  }

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      hide(signedInView); hide(alreadyView); show(signedOutView);
      return;
    }
    hide(signedOutView);
    if (userChip) {
      userChip.innerHTML = '<strong>' + (user.displayName || user.email || 'Signed in') + '</strong>' +
        (user.email ? '<br><span class="small">' + user.email + '</span>' : '');
    }
    const pending = await hasPendingRequest(user.uid);
    if (pending) {
      hide(signedInView); show(alreadyView);
    } else {
      show(signedInView); hide(alreadyView);
    }
  });

  if (emailForm) {
    emailForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = $('input[name="email"]', emailForm).value.trim();
      const password = $('input[name="password"]', emailForm).value;
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        setStatus('Sign-in failed: ' + friendlyAuthError(err), 'error');
      }
    });
  }

  if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
      try {
        await signInWithPopup(auth, new GoogleAuthProvider());
      } catch (err) {
        setStatus('Google sign-in failed: ' + friendlyAuthError(err), 'error');
      }
    });
  }

  if (signOutBtn) {
    signOutBtn.addEventListener('click', () => signOut(auth));
  }

  if (submitForm) {
    submitForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const user = auth.currentUser;
      if (!user) return;
      const confirmCheckbox = $('input[name="confirm"]', submitForm);
      if (confirmCheckbox && !confirmCheckbox.checked) {
        setStatus('Please check the confirmation box first.', 'error');
        return;
      }
      const detailsField = $('textarea[name="details"]', submitForm);
      const submitBtn = $('button[type="submit"]', submitForm);
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting…';
      try {
        await addDoc(collection(db, 'privacyRequests'), {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          type: type,
          details: detailsField ? detailsField.value.trim() : '',
          status: 'pending',
          createdAt: serverTimestamp(),
        });
        setStatus(requestSubmittedMessage(type), 'success');
        submitForm.reset();
        hide(submitForm);
        show(alreadyView);
        hide(signedInView);
      } catch (err) {
        setStatus('Could not submit your request: ' + err.message, 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = submitForm.getAttribute('data-submit-label') || 'Submit Request';
      }
    });
  }
}

function requestSubmittedMessage(type) {
  if (type === 'deletion') {
    return 'Your account deletion request has been received. Our team will review it and you’ll get a notification once it’s processed.';
  }
  if (type === 'export') {
    return 'Your data export request has been received. Our team will prepare your data and contact you at your account email.';
  }
  return 'Your correction request has been received. Our team will review and update your information.';
}

function friendlyAuthError(err) {
  const code = err && err.code;
  if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
    return 'Incorrect email or password.';
  }
  if (code === 'auth/too-many-requests') return 'Too many attempts — please wait a moment and try again.';
  if (code === 'auth/popup-closed-by-user') return 'Sign-in window closed before completing.';
  return (err && err.message) || 'Unknown error.';
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-privacy-request]').forEach(initPrivacyRequestWidget);
});
