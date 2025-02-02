import { LucideIcon, Home, Inbox } from 'lucide-react'

interface MenuItem {
  title: string
  url: string
  icon: LucideIcon
}

export const routes: MenuItem[] = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Productos',
    url: '/products',
    icon: Inbox,
  },
]

export const getRoute = (title: string) => {
  return routes.find((route) => route.title === title)
}

export const getRouteByURL = (url: string) => {
  return routes.find((route) => route.url === url)
}
