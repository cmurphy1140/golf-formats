import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useKeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    let lastKeyTime = 0;
    let lastKey = '';
    let currentFocusIndex = -1;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || 
                     target.tagName === 'TEXTAREA' || 
                     target.contentEditable === 'true';

      // Don't trigger shortcuts when typing in inputs
      if (isInput && e.key !== 'Escape' && !e.key.startsWith('Arrow')) return;

      const now = Date.now();
      const timeSinceLastKey = now - lastKeyTime;

      // Handle two-key shortcuts (like 'g h' for go home)
      if (timeSinceLastKey < 1000 && lastKey === 'g') {
        switch(e.key.toLowerCase()) {
          case 'h':
            e.preventDefault();
            router.push('/');
            break;
          case 'f':
            e.preventDefault();
            router.push('/formats');
            break;
          case 's':
            e.preventDefault();
            router.push('/settings');
            break;
        }
        lastKey = '';
        return;
      }

      // Handle arrow key navigation for format cards
      if (e.key.startsWith('Arrow') && !isInput) {
        const cards = Array.from(document.querySelectorAll('[data-format-card]')) as HTMLElement[];
        if (cards.length === 0) return;

        e.preventDefault();
        
        switch(e.key) {
          case 'ArrowDown':
            currentFocusIndex = currentFocusIndex < cards.length - 1 ? currentFocusIndex + 1 : 0;
            break;
          case 'ArrowUp':
            currentFocusIndex = currentFocusIndex > 0 ? currentFocusIndex - 1 : cards.length - 1;
            break;
          case 'ArrowRight':
            // For grid layout, move to next column
            const cols = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
            currentFocusIndex = Math.min(currentFocusIndex + 1, cards.length - 1);
            break;
          case 'ArrowLeft':
            // For grid layout, move to previous column
            currentFocusIndex = Math.max(currentFocusIndex - 1, 0);
            break;
        }
        
        if (currentFocusIndex >= 0 && currentFocusIndex < cards.length) {
          cards[currentFocusIndex].focus();
          cards[currentFocusIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      switch(e.key) {
        case '/':
          e.preventDefault();
          const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
            searchInput.select();
          }
          break;
        
        case 'f':
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            const filterButton = document.querySelector('[data-filter-toggle]') as HTMLButtonElement;
            if (filterButton) filterButton.click();
          }
          break;
        
        case 'Enter':
          // Navigate to focused card
          if (document.activeElement?.hasAttribute('data-format-card')) {
            const link = document.activeElement.querySelector('a') as HTMLAnchorElement;
            if (link) link.click();
          }
          break;
        
        case 'Escape':
          // Clear search or close modals
          currentFocusIndex = -1;
          const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
          if (searchInput && searchInput.value) {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
          }
          break;

        case '?':
          if (e.shiftKey) {
            e.preventDefault();
            // Show keyboard shortcuts help
            const event = new CustomEvent('show-shortcuts');
            window.dispatchEvent(event);
          }
          break;
      }

      lastKey = e.key.toLowerCase();
      lastKeyTime = now;
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);
}