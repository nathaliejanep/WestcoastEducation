const renderResultMessage = (
  messageContainer: HTMLElement,
  message: string
) => {
  messageContainer.innerHTML = '';

  const messageElement: HTMLParagraphElement = document.createElement('p');
  messageElement.textContent = message;
  messageElement.classList.add('text-danger');

  messageContainer.appendChild(messageElement);
};

export { renderResultMessage };
