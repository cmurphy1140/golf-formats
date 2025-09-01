# Golf Formats App - Personalized Best Practices

## Workflow Management
@CLAUDE.sessions.md - FOLLOW THIS WORKFLOW FOR ALL TASKS

## UI/UX Design Preferences
- **Professional & Sleek**: Avoid cartoonish or childish elements at all costs
- **Masters Tournament Aesthetic**: Use pine greens, tans, ambers, and cream colors
- **Centered Content**: Keep main content centered for optimal readability
- **Subtle Animations**: Use discrete, professional animations (300-500ms transitions)
- **Condensed Layouts**: Minimize excessive spacing, keep interfaces tight and organized
- **Dynamic Elements**: Add subtle interactive features that enhance without overwhelming

## Color System (Masters Theme)
- Pine Green: #004B36 (primary, use for borders and accents)
- Fairway: #006747 (medium green for gradients)
- Charcoal: #2C312E (primary text)
- Slate: #4A5247 (body text)
- Sand: #F5F2ED (tan backgrounds)
- Gold: #D4A574 (accent highlights)
- Cream: #FDFDF8 (light backgrounds)

## Component Design Standards
- **Cards**: White background with faint green borders (border-masters-pine/10)
- **Hover Effects**: Subtle scale (1.02) and translateY(-2px) transforms
- **Text Legibility**: Ensure proper contrast, avoid blurry or low-opacity text
- **Borders**: Use 2px green borders on interactive elements
- **Backgrounds**: Tan/beige gradients, avoid stark white spaces

## Development Workflow
- **Git Commits**: Create atomic commits for each feature for easy reversion
- **Testing**: Always verify features work before marking complete
- **Iterative Improvement**: Be prepared to revert and try different approaches
- **Visual Feedback**: Expect and respond to screenshot-based feedback

## Code Organization
- **Component Structure**: Keep components small and focused
- **State Management**: Use Zustand for global state, React hooks for local
- **Animations**: Define in CSS/Tailwind, trigger with state changes
- **Icons**: Use Lucide React icons consistently (NO EMOJIS)

## Interactive Features Approach
1. Always propose ideas before implementing
2. Make features subtle but engaging
3. Ensure professional appearance
4. Use smooth, non-jarring animations
5. Connect to existing state management

## Common Patterns to Follow
- **Loading States**: Animated counters and opacity transitions
- **Category Selection**: Pill buttons with active states
- **Filter Systems**: Connected to global store with real-time updates
- **Hover Previews**: Slide-up overlays with relevant information
- **Navigation**: Minimal, focused on core functionality

## Things to Avoid
- ❌ Cartoonish or playful designs
- ❌ Excessive animations or rotations
- ❌ Redundant UI elements
- ❌ Overlapping content
- ❌ Poor text contrast
- ❌ Excessive whitespace
- ❌ Unprofessional interactions

## Quality Checks
- Ensure all text is legible with proper contrast
- Verify no content overlaps or clips
- Test all interactive elements function correctly
- Confirm animations are smooth and professional
- Check for UI/UX consistency across all pages

## Communication Style
- Be direct and concise
- Acknowledge visual feedback immediately
- Propose solutions before implementing
- Be ready to revert changes if requested
- Focus on professional, sleek implementations

## Git Strategy
- Commit each feature separately
- Use clear commit messages
- Be prepared to revert specific commits
- Push to GitHub when requested
- Keep main branch clean

## Testing Requirements
- Run dev server after changes
- Verify all navigation works
- Test filter functionality
- Ensure animations perform smoothly
- Check responsive behavior

---
*These practices are specific to the Golf Formats app and supplement global CLAUDE.md preferences.*