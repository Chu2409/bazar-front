import {
  LucideIcon,
  Inbox,
  Boxes,
  Tag,
  Package,
  Users,
  BadgeDollarSign,
} from 'lucide-react'

interface MenuItem {
  title: string
  url: string
  icon: LucideIcon
}

export const routes: MenuItem[] = [
  {
    title: 'Ventas',
    url: '/sales',
    icon: BadgeDollarSign,
  },
  {
    title: 'Inventario',
    url: '/inventory',
    icon: Boxes,
  },
  {
    title: 'Productos',
    url: '/products',
    icon: Inbox,
  },
  {
    title: 'Clientes',
    url: '/customers',
    icon: Users,
  },
  {
    title: 'Categorías',
    url: '/categories',
    icon: Tag,
  },
  {
    title: 'Proveedores',
    url: '/suppliers',
    icon: Package,
  },
]

export const getRoute = (title: string) => {
  return routes.find((route) => route.title === title)
}

export const getRouteByURL = (url: string) => {
  return routes.find((route) => route.url === url)
}
