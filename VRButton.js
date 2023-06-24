class VRButton {
	static createButton(renderer, customButtonId = "VRButton", targetDivId) {
		const button = document.getElementById(customButtonId);
		const targetDiv = document.getElementById(targetDivId);
	
		function showEnterVR() {
		  let currentSession = null;
	
		  async function onSessionStarted(session) {
			session.addEventListener('end', onSessionEnded);
			await renderer.xr.setSession(session);
			button.textContent = 'EXIT VR';
			currentSession = session;
		  }
	
		  function onSessionEnded() {
			currentSession.removeEventListener('end', onSessionEnded);
			button.textContent = 'ENTER VR';
			currentSession = null;
		  }
	
		  button.textContent = 'ENTER VR';
	
		  button.onclick = function () {
			if (currentSession === null) {
			  const sessionInit = { optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers'] };
			  navigator.xr.requestSession('immersive-vr', sessionInit).then(onSessionStarted);
			} else {
			  currentSession.end();
			}
		  };
	
		  targetDiv.appendChild(button); // Append button to target div
		}
	
  
	  function disableButton() {
		button.onclick = null;
	  }
  
	  function showWebXRNotFound() {
		disableButton();
		button.textContent = 'VR NOT SUPPORTED';
	  }
  
	  function showVRNotAllowed(exception) {
		disableButton();
		console.warn('Exception when trying to call xr.isSessionSupported', exception);
		button.textContent = 'VR NOT ALLOWED';
	  }
  
	  if ('xr' in navigator) {
		button.id = 'VRButton';
		button.style.display = 'block';
		navigator.xr.isSessionSupported('immersive-vr').then(function (supported) {
		  supported ? showEnterVR() : showWebXRNotFound();
		  if (supported && VRButton.xrSessionIsGranted) {
			button.click();
		  }
		}).catch(showVRNotAllowed);
		return button;
	  } else {
		const message = document.createElement('a');
		if (window.isSecureContext === false) {
		  message.href = document.location.href.replace(/^http:/, 'https:');
		  message.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message
		} else {
		  message.href = 'https://immersiveweb.dev/';
		  message.innerHTML = 'WEBXR NOT AVAILABLE';
		}
		return message;
	  }
	}
  
	static registerSessionGrantedListener() {
	  if ('xr' in navigator) {
		// WebXRViewer (based on Firefox) has a bug where addEventListener
		// throws a silent exception and aborts execution entirely.
		if (/WebXRViewer\//i.test(navigator.userAgent)) return;
		navigator.xr.addEventListener('sessiongranted', () => {
		  VRButton.xrSessionIsGranted = true;
		});
	  }
	}
  }
  
  VRButton.xrSessionIsGranted = false;
  VRButton.registerSessionGrantedListener();
  
  export { VRButton };
  