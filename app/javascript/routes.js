import Home from './scenes/Home'
import DeckDetails from './scenes/DeckDetails'

export default [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Home },
  { path: '/decks/:id', component: DeckDetails }
]
