const style = document.createElement('style');
style.textContent = `
.notifier {
  position: fixed;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.75rem 1.5rem;
  background-color: #0BA2FF;
  background-color: #ffffff;
  color: #0BA2FF;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  max-width: 90vw;
  width: max-content;
  max-width: 300px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: slideUpFade 0.4s ease-out;
  z-index: 1000;
}

@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
`;
document.head.appendChild(style);


export const showNotifier=(text)=>{
  const notifier = document.createElement('span')
  notifier.setAttribute('role', 'alert')
notifier.classList.add('notifier')
notifier.innerHTML = `<p>${text}</p>`;
document.body.appendChild(notifier)
setTimeout(() => {
  document.querySelector('.notifier')?.remove();
}, 3000);
}

