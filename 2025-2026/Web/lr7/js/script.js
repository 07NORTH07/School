document.querySelectorAll('.category-card').forEach(card => {
  const track = card.querySelector('.category-card__track');
  const nextBtn = card.querySelector('.track-nav--next');
  const prevBtn = card.querySelector('.track-nav--prev');

  if (!track) return;

  const scrollAmount = track.offsetWidth * 0.8;

  nextBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  prevBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
});