import Home from './scenes/Home'
import DeckDetails from './scenes/DeckDetails'
import ReviewSession from './scenes/ReviewSession'

export default [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Home },
  { path: '/decks/:id', component: DeckDetails },
  { path: '/decks/:id/review-session', component: ReviewSession }
]
