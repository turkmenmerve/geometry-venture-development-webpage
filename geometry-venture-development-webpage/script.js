const subscriptionForm = document.getElementById('subscription-form');
const agreeCheckbox = document.getElementById('agree-checkbox');
const validationMessage = document.getElementById('validation-message');

subscriptionForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!agreeCheckbox.checked) {
    validationMessage.textContent = 'Please agree to subscribe to the newsletter.';
    validationMessage.style.color = 'red';
  } else {
    const email = document.querySelector('input[name="email"]').value;
    const backendApiUrl = 'https://geometryventure.dev/google_script_proxy.php';
    const payload = { email: email };

    fetch(backendApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.text())
      .then(data => {
        validationMessage.style.display = 'inline-block';
        validationMessage.style.opacity = 1;
        if (window.innerWidth < 1200) {
          if (data === 'Success') {
            validationMessage.textContent = 'All set, thank you!';
            validationMessage.style.color = '#d8f1df';
            validationMessage.style.backgroundColor = '#364d42';
          } else {
            validationMessage.textContent = 'Oops! Something went wrong.';
            validationMessage.style.color = '#f4b3ab';
            validationMessage.style.backgroundColor = '#5a3b3e';
          }
        } else {
          if (data === 'Success') {
            validationMessage.textContent = 'All set, thank you!';
            validationMessage.style.color = '#276e4c';
            validationMessage.style.backgroundColor = '#e4f3ed';
          } else {
            validationMessage.textContent = 'Oops! Something went wrong.';
            validationMessage.style.color = '#bd1c37';
            validationMessage.style.backgroundColor = '#ffecea';
          }
        }
        setTimeout(() => {
          validationMessage.style.opacity = 0;
          setTimeout(() => {
            validationMessage.style.display = 'none';
          }, 250); // wait for the fade out to finish before hiding the element
        }, 3000); // keep the message displayed for 3 seconds
        if (data === 'Success') {
          subscriptionForm.reset(); // Clear the form inputs if subscription was successful
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }
});
