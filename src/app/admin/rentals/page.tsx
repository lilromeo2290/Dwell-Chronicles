'use client'

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Home,
  MapPin,
  BedDouble,
  Building2,
  ToggleLeft,
  ToggleRight,
  Save,
  ArrowLeft,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'

// ── Brand colours ──────────────────────────────────────────────────
const BRAND = {
  sage: '#5F8768',
  stone: '#D8D5CC',
  offWhite: '#F8F7F3',
  charcoal: '#2F3A33',
} as const

// ── Types ──────────────────────────────────────────────────────────
interface RentalProperty {
  id: string
  name: string
  location: string
  type: string
  price: string
  priceNum: number
  bedrooms: number
  status: 'available' | 'taken'
}

interface FormData {
  name: string
  location: string
  type: string
  price: string
  bedrooms: string
  status: 'available' | 'taken'
}

const initialFormData: FormData = {
  name: '',
  location: '',
  type: '',
  price: '',
  bedrooms: '1',
  status: 'available',
}

// ── Constants ──────────────────────────────────────────────────────
const LOCATIONS = [
  'Any Location',
  'Ho',
  'Hohoe',
  'Keta',
  'Akosombo',
  'Aflao',
  'Sogakope',
  'Kpando',
  'Denu',
]

const PROPERTY_TYPES = [
  'All Types',
  'Apartment',
  'House',
  'Flat',
  'Studio',
  'Self-Contain',
  'Chamber & Hall',
  'Single Room',
]

const PRICE_RANGES = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under GH₵ 300', min: 0, max: 299 },
  { label: 'GH₵ 300 - GH₵ 500', min: 300, max: 500 },
  { label: 'GH₵ 500 - GH₵ 1,000', min: 500, max: 1000 },
  { label: 'Over GH₵ 1,000', min: 1001, max: Infinity },
]

const BEDROOM_OPTIONS = ['Any', '1', '2', '3', '4+']

const SAMPLE_DATA: RentalProperty[] = [
  { id: '1', name: 'Two Bedroom Flat', location: 'Ho', type: 'Flat', price: 'GH₵ 800/month', priceNum: 800, bedrooms: 2, status: 'available' },
  { id: '2', name: 'Studio Apartment', location: 'Ho', type: 'Studio', price: 'GH₵ 400/month', priceNum: 400, bedrooms: 1, status: 'taken' },
  { id: '3', name: 'Self-Contain Room', location: 'Hohoe', type: 'Self-Contain', price: 'GH₵ 350/month', priceNum: 350, bedrooms: 1, status: 'available' },
  { id: '4', name: 'Three Bedroom House', location: 'Keta', type: 'House', price: 'GH₵ 1,500/month', priceNum: 1500, bedrooms: 3, status: 'available' },
  { id: '5', name: 'Chamber & Hall', location: 'Akosombo', type: 'Chamber & Hall', price: 'GH₵ 500/month', priceNum: 500, bedrooms: 1, status: 'taken' },
  { id: '6', name: 'Executive Apartment', location: 'Ho', type: 'Apartment', price: 'GH₵ 2,000/month', priceNum: 2000, bedrooms: 3, status: 'available' },
  { id: '7', name: 'Single Room', location: 'Aflao', type: 'Single Room', price: 'GH₵ 200/month', priceNum: 200, bedrooms: 1, status: 'available' },
  { id: '8', name: 'Two Bedroom House', location: 'Sogakope', type: 'House', price: 'GH₵ 1,200/month', priceNum: 1200, bedrooms: 2, status: 'taken' },
]

// ── Helpers ────────────────────────────────────────────────────────
function parsePrice(str: string): number {
  const match = str.match(/[\d,]+/)
  if (!match) return 0
  return parseInt(match[0].replace(/,/g, ''), 10)
}

function formatPrice(n: number): string {
  return `GH₵ ${n.toLocaleString()}/month`
}

function getTypeBadgeColor(type: string) {
  switch (type) {
    case 'Apartment':
      return 'bg-[#5F8768]/15 text-[#2F3A33] border-[#5F8768]/30'
    case 'House':
      return 'bg-amber-100 text-amber-800 border-amber-200'
    case 'Flat':
      return 'bg-sky-100 text-sky-800 border-sky-200'
    case 'Studio':
      return 'bg-violet-100 text-violet-800 border-violet-200'
    case 'Self-Contain':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200'
    case 'Chamber & Hall':
      return 'bg-rose-100 text-rose-800 border-rose-200'
    case 'Single Room':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

// ── Animation variants ─────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.35, ease: 'easeOut' },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

// ══════════════════════════════════════════════════════════════════
// Page Component
// ══════════════════════════════════════════════════════════════════
export default function AdminRentalsPage() {
  const { toast } = useToast()

  // ── State ──────────────────────────────────────────────────────
  const [properties, setProperties] = useState<RentalProperty[]>(SAMPLE_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterLocation, setFilterLocation] = useState('Any Location')
  const [filterType, setFilterType] = useState('All Types')
  const [filterPrice, setFilterPrice] = useState('Any Price')
  const [filterBedrooms, setFilterBedrooms] = useState('Any')

  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  // ── Derived data ───────────────────────────────────────────────
  const priceRange = useMemo(
    () => PRICE_RANGES.find((r) => r.label === filterPrice) ?? PRICE_RANGES[0],
    [filterPrice],
  )

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.location.toLowerCase().includes(q) &&
          !p.type.toLowerCase().includes(q)
        ) {
          return false
        }
      }
      // Location
      if (filterLocation !== 'Any Location' && p.location !== filterLocation) return false
      // Type
      if (filterType !== 'All Types' && p.type !== filterType) return false
      // Price
      if (p.priceNum < priceRange.min || p.priceNum > priceRange.max) return false
      // Bedrooms
      if (filterBedrooms !== 'Any') {
        if (filterBedrooms === '4+') {
          if (p.bedrooms < 4) return false
        } else if (p.bedrooms !== parseInt(filterBedrooms, 10)) return false
      }
      return true
    })
  }, [properties, searchQuery, filterLocation, filterType, filterPrice, filterBedrooms, priceRange])

  const stats = useMemo(
    () => ({
      total: properties.length,
      available: properties.filter((p) => p.status === 'available').length,
      taken: properties.filter((p) => p.status === 'taken').length,
    }),
    [properties],
  )

  // ── Actions ────────────────────────────────────────────────────
  const toggleStatus = useCallback(
    (id: string) => {
      setProperties((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p
          const next = p.status === 'available' ? 'taken' : 'available'
          toast({
            title: `Status updated`,
            description: `"${p.name}" is now ${next}.`,
          })
          return { ...p, status: next }
        }),
      )
    },
    [toast],
  )

  const deleteProperty = useCallback(
    (id: string) => {
      const p = properties.find((x) => x.id === id)
      setProperties((prev) => prev.filter((x) => x.id !== id))
      toast({
        title: 'Property deleted',
        description: p ? `"${p.name}" has been removed.` : 'Property has been removed.',
        variant: 'destructive',
      })
    },
    [properties, toast],
  )

  const openAddSheet = () => {
    setEditingId(null)
    setFormData(initialFormData)
    setFormErrors({})
    setSheetOpen(true)
  }

  const openEditSheet = (p: RentalProperty) => {
    setEditingId(p.id)
    setFormData({
      name: p.name,
      location: p.location,
      type: p.type,
      price: String(p.priceNum),
      bedrooms: String(p.bedrooms),
      status: p.status,
    })
    setFormErrors({})
    setSheetOpen(true)
  }

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof FormData, string>> = {}
    if (!formData.name.trim()) errors.name = 'Name is required'
    if (!formData.location) errors.location = 'Location is required'
    if (!formData.type) errors.type = 'Property type is required'
    const priceNum = parseInt(formData.price, 10)
    if (!formData.price || isNaN(priceNum) || priceNum <= 0) errors.price = 'Enter a valid price'
    if (!formData.bedrooms || parseInt(formData.bedrooms, 10) < 1) errors.bedrooms = 'Bedrooms required'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSave = () => {
    if (!validateForm()) return
    const priceNum = parseInt(formData.price, 10)

    if (editingId) {
      setProperties((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name: formData.name.trim(),
                location: formData.location,
                type: formData.type,
                price: formatPrice(priceNum),
                priceNum,
                bedrooms: parseInt(formData.bedrooms, 10),
                status: formData.status,
              }
            : p,
        ),
      )
      toast({ title: 'Property updated', description: `"${formData.name}" has been updated.` })
    } else {
      const newProp: RentalProperty = {
        id: String(Date.now()),
        name: formData.name.trim(),
        location: formData.location,
        type: formData.type,
        price: formatPrice(priceNum),
        priceNum,
        bedrooms: parseInt(formData.bedrooms, 10),
        status: formData.status,
      }
      setProperties((prev) => [...prev, newProp])
      toast({ title: 'Property added', description: `"${formData.name}" has been added.` })
    }
    setSheetOpen(false)
  }

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    setFormErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: BRAND.offWhite }}
    >
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* ─── Top Bar ─── */}
        <header className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="mb-2 inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#5F8768]"
              style={{ color: BRAND.charcoal }}
            >
              <ArrowLeft className="size-4" />
              Back to Site
            </Link>
            <h1
              className="text-2xl font-bold tracking-tight sm:text-3xl"
              style={{ color: BRAND.charcoal }}
            >
              Rental Properties Management
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage rental property listings and their availability status
            </p>
          </div>
          <Button
            onClick={openAddSheet}
            className="mt-3 shrink-0 sm:mt-0"
            style={{ backgroundColor: BRAND.sage }}
          >
            <Plus className="size-4" />
            Add New Property
          </Button>
        </header>

        {/* ─── Filter Section ─── */}
        <section
          className="mb-6 rounded-xl border p-4 sm:p-6"
          style={{ backgroundColor: '#fff', borderColor: BRAND.stone }}
        >
          <div className="mb-4 flex items-center gap-2">
            <Search className="size-4 text-muted-foreground" />
            <span className="text-sm font-semibold" style={{ color: BRAND.charcoal }}>
              Filter Properties
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {/* Search */}
            <div className="relative lg:col-span-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            {/* Location */}
            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Type */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Price Range */}
            <Select value={filterPrice} onValueChange={setFilterPrice}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                {PRICE_RANGES.map((r) => (
                  <SelectItem key={r.label} value={r.label}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Bedrooms */}
            <Select value={filterBedrooms} onValueChange={setFilterBedrooms}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                {BEDROOM_OPTIONS.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* ─── Stats Row ─── */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: 'Total Properties', value: stats.total, icon: Building2, color: BRAND.charcoal, bg: BRAND.stone },
            { label: 'Available', value: stats.available, icon: Home, color: '#15803d', bg: '#dcfce7' },
            { label: 'Taken', value: stats.taken, icon: MapPin, color: '#b91c1c', bg: '#fef2f2' },
          ].map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-4 rounded-xl border p-4 sm:p-5"
              style={{ backgroundColor: '#fff', borderColor: BRAND.stone }}
            >
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: s.bg }}
              >
                <s.icon className="size-5" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold" style={{ color: s.color }}>
                  {s.value}
                </p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* ─── Properties (Desktop Table) ─── */}
        <section
          className="hidden rounded-xl border md:block"
          style={{ backgroundColor: '#fff', borderColor: BRAND.stone }}
        >
          <Table>
            <TableHeader>
              <TableRow style={{ borderBottomColor: BRAND.stone }}>
                <TableHead className="font-semibold" style={{ color: BRAND.charcoal }}>Property</TableHead>
                <TableHead className="font-semibold" style={{ color: BRAND.charcoal }}>Location</TableHead>
                <TableHead className="font-semibold" style={{ color: BRAND.charcoal }}>Type</TableHead>
                <TableHead className="font-semibold" style={{ color: BRAND.charcoal }}>Price</TableHead>
                <TableHead className="font-semibold" style={{ color: BRAND.charcoal }}>Beds</TableHead>
                <TableHead className="font-semibold" style={{ color: BRAND.charcoal }}>Status</TableHead>
                <TableHead className="text-right font-semibold" style={{ color: BRAND.charcoal }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {filteredProperties.map((p, i) => (
                  <motion.tr
                    key={p.id}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="border-b transition-colors hover:bg-muted/50"
                    style={{ borderBottomColor: BRAND.stone }}
                  >
                    <TableCell className="font-medium" style={{ color: BRAND.charcoal }}>
                      <div className="flex items-center gap-2">
                        <Home className="size-4 shrink-0 text-muted-foreground" />
                        {p.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="size-3.5 shrink-0" />
                        {p.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTypeBadgeColor(p.type)}>
                        <Building2 className="size-3" />
                        {p.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold" style={{ color: BRAND.charcoal }}>
                      {p.price}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm">
                        <BedDouble className="size-3.5 text-muted-foreground" />
                        {p.bedrooms}
                      </div>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => toggleStatus(p.id)}
                        className="focus:outline-none"
                        aria-label={`Toggle status of ${p.name}`}
                      >
                        <Badge
                          className={`
                            cursor-pointer select-none px-3 py-1 text-xs font-semibold transition-all
                            ${
                              p.status === 'available'
                                ? 'bg-emerald-100 text-emerald-700 border border-emerald-300 hover:bg-emerald-200'
                                : 'bg-red-100 text-red-700 border border-red-300 hover:bg-red-200'
                            }
                          `}
                        >
                          {p.status === 'available' ? (
                            <ToggleRight className="size-3.5" />
                          ) : (
                            <ToggleLeft className="size-3.5" />
                          )}
                          {p.status === 'available' ? 'Available' : 'Taken'}
                        </Badge>
                      </button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() => openEditSheet(p)}
                          aria-label={`Edit ${p.name}`}
                        >
                          <Edit className="size-4" style={{ color: BRAND.sage }} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 hover:bg-red-50"
                          onClick={() => deleteProperty(p.id)}
                          aria-label={`Delete ${p.name}`}
                        >
                          <Trash2 className="size-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredProperties.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    No properties match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>

        {/* ─── Properties (Mobile Cards) ─── */}
        <section className="flex flex-col gap-4 md:hidden">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((p, i) => (
              <motion.div
                key={p.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="rounded-xl border p-4"
                style={{ backgroundColor: '#fff', borderColor: BRAND.stone }}
              >
                {/* Card Header */}
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex size-9 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${BRAND.sage}15` }}
                    >
                      <Home className="size-4" style={{ color: BRAND.sage }} />
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: BRAND.charcoal }}>
                        {p.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="size-3" />
                        {p.location}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleStatus(p.id)}
                    aria-label={`Toggle status of ${p.name}`}
                  >
                    <Badge
                      className={`
                        cursor-pointer select-none text-[11px] font-semibold transition-all
                        ${
                          p.status === 'available'
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                            : 'bg-red-100 text-red-700 border border-red-300'
                        }
                      `}
                    >
                      {p.status === 'available' ? (
                        <ToggleRight className="size-3.5" />
                      ) : (
                        <ToggleLeft className="size-3.5" />
                      )}
                      {p.status === 'available' ? 'Available' : 'Taken'}
                    </Badge>
                  </button>
                </div>

                {/* Card Details */}
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <Badge variant="outline" className={`text-[11px] ${getTypeBadgeColor(p.type)}`}>
                    <Building2 className="size-3" />
                    {p.type}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <BedDouble className="size-3" />
                    {p.bedrooms} Bed{p.bedrooms > 1 ? 's' : ''}
                  </span>
                  <span className="ml-auto text-sm font-bold" style={{ color: BRAND.sage }}>
                    {p.price}
                  </span>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 border-t pt-3" style={{ borderColor: BRAND.stone }}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => openEditSheet(p)}
                  >
                    <Edit className="size-3.5" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-red-200 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => deleteProperty(p.id)}
                  >
                    <Trash2 className="size-3.5" />
                    Delete
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredProperties.length === 0 && (
            <div className="rounded-xl border p-8 text-center text-muted-foreground" style={{ borderColor: BRAND.stone, backgroundColor: '#fff' }}>
              No properties match your filters.
            </div>
          )}
        </section>
      </main>

      {/* ─── Add / Edit Sheet ─── */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader className="mb-2">
            <SheetTitle style={{ color: BRAND.charcoal }}>
              {editingId ? 'Edit Property' : 'Add New Property'}
            </SheetTitle>
            <SheetDescription>
              {editingId
                ? 'Update the property details below.'
                : 'Fill in the details to add a new rental property.'}
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-5 px-4 pb-4">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="prop-name">Property Name</Label>
              <Input
                id="prop-name"
                placeholder="e.g. Two Bedroom Flat"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                aria-invalid={!!formErrors.name}
              />
              {formErrors.name && (
                <p className="text-xs text-red-500">{formErrors.name}</p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <Label>Location</Label>
              <Select
                value={formData.location}
                onValueChange={(v) => updateField('location', v)}
              >
                <SelectTrigger className="w-full" aria-invalid={!!formErrors.location}>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.filter((l) => l !== 'Any Location').map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.location && (
                <p className="text-xs text-red-500">{formErrors.location}</p>
              )}
            </div>

            {/* Property Type */}
            <div className="space-y-1.5">
              <Label>Property Type</Label>
              <Select
                value={formData.type}
                onValueChange={(v) => updateField('type', v)}
              >
                <SelectTrigger className="w-full" aria-invalid={!!formErrors.type}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {PROPERTY_TYPES.filter((t) => t !== 'All Types').map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.type && (
                <p className="text-xs text-red-500">{formErrors.type}</p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-1.5">
              <Label htmlFor="prop-price">Price (GH₵/month)</Label>
              <Input
                id="prop-price"
                type="number"
                placeholder="e.g. 800"
                min={1}
                value={formData.price}
                onChange={(e) => updateField('price', e.target.value)}
                aria-invalid={!!formErrors.price}
              />
              {formErrors.price && (
                <p className="text-xs text-red-500">{formErrors.price}</p>
              )}
            </div>

            {/* Bedrooms */}
            <div className="space-y-1.5">
              <Label>Bedrooms</Label>
              <Select
                value={formData.bedrooms}
                onValueChange={(v) => updateField('bedrooms', v)}
              >
                <SelectTrigger className="w-full" aria-invalid={!!formErrors.bedrooms}>
                  <SelectValue placeholder="Select bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  {['1', '2', '3', '4', '5', '6', '7', '8'].map((b) => (
                    <SelectItem key={b} value={b}>
                      {b} Bedroom{parseInt(b, 10) > 1 ? 's' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.bedrooms && (
                <p className="text-xs text-red-500">{formErrors.bedrooms}</p>
              )}
            </div>

            {/* Status Toggle */}
            <div className="flex items-center justify-between rounded-lg border p-3" style={{ borderColor: BRAND.stone }}>
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Availability Status</Label>
                <p className="text-xs text-muted-foreground">
                  {formData.status === 'available' ? 'Property is available for rent' : 'Property is currently taken'}
                </p>
              </div>
              <Switch
                checked={formData.status === 'available'}
                onCheckedChange={(checked) =>
                  updateField('status', checked ? 'available' : 'taken')
                }
                className="data-[state=checked]:bg-[#5F8768]"
              />
            </div>
          </div>

          <SheetFooter className="border-t px-4" style={{ borderColor: BRAND.stone }}>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setSheetOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              style={{ backgroundColor: BRAND.sage }}
              onClick={handleSave}
            >
              <Save className="size-4" />
              {editingId ? 'Update Property' : 'Add Property'}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}