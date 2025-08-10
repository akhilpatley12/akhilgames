document.addEventListener('DOMContentLoaded', () => {

    // --- Local Storage Keys ---
    const mainImageKey = 'permanentHomepageImage';
    const secondaryImageKey = 'secondaryHomepageImage';

    // --- General Elements ---
    const adminSection = document.getElementById('admin-upload-section');
    const welcomeText = document.getElementById('welcome-text');
    const adminLoginBtn = document.getElementById('admin-login-btn');

    // --- Helper Functions ---
    const checkAdminAccess = () => {
        const password = prompt('Please enter admin password:');
        if (password === '1234') {
            adminSection.style.display = 'block';
            adminLoginBtn.style.display = 'none'; // Hide button after login
        } else if (password) {
            alert('Wrong password!');
        }
    };

    // Generic function to set up an image upload feature
    const setupImageUpload = (config) => {
        const imgElement = document.getElementById(config.imgId);
        const imgContainer = document.getElementById(config.containerId);
        const uploadControl = document.getElementById(config.controlId);
        const uploadInput = document.getElementById(config.inputId);
        const uploadButton = document.getElementById(config.buttonId);

        const savedImage = localStorage.getItem(config.storageKey);

        if (savedImage) {
            imgElement.src = savedImage;
            if (imgContainer) imgContainer.style.display = 'block';
            imgElement.style.display = 'block';
            if (uploadControl) uploadControl.style.display = 'none';
            welcomeText.style.display = 'none';
            return true; // Image was loaded
        } else {
            if (uploadControl) {
                uploadControl.style.display = 'block'; // Keep controls ready but hidden
                uploadButton.addEventListener('click', () => {
                    const file = uploadInput.files[0];
                    if (!file) {
                        alert('Please select a file first!');
                        return;
                    }
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const imageDataUrl = e.target.result;
                        localStorage.setItem(config.storageKey, imageDataUrl);
                        imgElement.src = imageDataUrl;
                        if (imgContainer) imgContainer.style.display = 'block';
                        imgElement.style.display = 'block';
                        uploadControl.style.display = 'none';
                        welcomeText.style.display = 'none';
                    };
                    reader.readAsDataURL(file);
                });
            }
            return false; // Image was not loaded
        }
    };

    // --- Initializer ---
    const init = () => {
        const mainImageLoaded = setupImageUpload({
            imgId: 'homepage-photo',
            containerId: null,
            controlId: 'upload-control-1',
            inputId: 'photo-upload-1',
            buttonId: 'upload-btn-1',
            storageKey: mainImageKey
        });

        const secondaryImageLoaded = setupImageUpload({
            imgId: 'secondary-photo',
            containerId: 'secondary-photo-container',
            controlId: 'upload-control-2',
            inputId: 'photo-upload-2',
            buttonId: 'upload-btn-2',
            storageKey: secondaryImageKey
        });

        adminLoginBtn.addEventListener('click', checkAdminAccess);

        // Hide the admin button if both images are already loaded
        if(mainImageLoaded && secondaryImageLoaded) {
            adminLoginBtn.style.display = 'none';
        }
    };

    init();
});
