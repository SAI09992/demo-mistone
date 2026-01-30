"use client"

import { MapPin, Briefcase, Home, Edit2, Check } from "lucide-react"
import { Address } from "@/lib/address-utils"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface AddressListProps {
    addresses: Address[]
    selectedId?: string
    onSelect: (address: Address) => void
    onEdit: (address: Address) => void
    onAddNew: () => void
}

export default function AddressList({ addresses, selectedId, onSelect, onEdit, onAddNew }: AddressListProps) {

    const getIcon = (label: string) => {
        switch (label.toLowerCase()) {
            case "home": return <Home className="h-4 w-4" />
            case "work": return <Briefcase className="h-4 w-4" />
            default: return <MapPin className="h-4 w-4" />
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-2">
                {addresses.map((addr) => {
                    const isSelected = selectedId === addr.id
                    return (
                        <div
                            key={addr.id}
                            className={cn(
                                "relative flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer hover:bg-muted/50",
                                isSelected ? "border-primary bg-primary/5 ring-1 ring-primary" : "bg-card"
                            )}
                            onClick={() => onSelect(addr)}
                        >
                            <div className={cn("mt-1 p-2 rounded-full", isSelected ? "bg-primary text-primary-foreground" : "bg-muted")}>
                                {getIcon(addr.label)}
                            </div>

                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-sm">{addr.label}</span>
                                    {isSelected && <Check className="h-4 w-4 text-primary" />}
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                    {addr.address}
                                </p>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onEdit(addr)
                                }}
                            >
                                <Edit2 className="h-3 w-3" />
                            </Button>
                        </div>
                    )
                })}
            </div>

            <Button onClick={onAddNew} className="w-full" size="lg">
                Add New Address
            </Button>
        </div>
    )
}
