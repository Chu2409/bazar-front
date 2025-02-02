import {
  LucideIcon,
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
} from 'lucide-react'

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
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
]
