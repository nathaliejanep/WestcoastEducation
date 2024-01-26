const renderResultMessage = (
  messageContainer: HTMLElement,
  message: string
) => {
  // Clear previous messages
  messageContainer.innerHTML = '';

  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  // TODO: You can add additional styling or classes to the message element if needed
  // messageElement.classList.add('result-message');

  messageContainer.appendChild(messageElement);
};

export { renderResultMessage };
