import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useKeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    let lastKeyTime = 0;
    let lastKey = '';

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || 
                     target.tagName === 'TEXTAREA' || 
                     target.contentEditable === 'true';

      // Don't trigger shortcuts when typing in inputs
      if (isInput && e.key !== 'Escape') return;

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
        
        case 'Escape':
          // Clear search or close modals
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