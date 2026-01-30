"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

import AddressList from "./AddressList"
import MapPicker from "./MapPicker"
import { Address, MOCKED_ADDRESSES } from "@/lib/address-utils"

interface AddressDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSelect: (address: Address) => void
    currentAddressId?: string
}

type ViewState = "LIST" | "ADD" | "EDIT"

export default function AddressDialog({ open, onOpenChange, onSelect, currentAddressId }: AddressDialogProps) {
    const [view, setView] = useState<ViewState>("LIST")
    const [addresses, setAddresses] = useState<Address[]>(MOCKED_ADDRESSES)
    const [editingAddress, setEditingAddress] = useState<Address | null>(null)

    // Form State
    const [formData, setFormData] = useState<Partial<Address>>({})

    const handleAddNew = () => {
        setFormData({})
        setView("ADD")
    }

    const handleEdit = (addr: Address) => {
        setEditingAddress(addr)
        setFormData(addr)
        setView("EDIT")
    }

    const handleBack = () => {
        setView("LIST")
        setEditingAddress(null)
        setFormData({})
    }

    const handleLocationSelect = (loc: { address: string; lat: number; lng: number; inServiceArea: boolean }) => {
        setFormData(prev => ({
            ...prev,
            address: loc.address,
            lat: loc.lat,
            lng: loc.lng
        }))
    }

    const handleSave = () => {
        // Basic validation
        if (!formData.address || !formData.label) return

        if (view === "ADD") {
            const newAddress: Address = {
                id: Math.random().toString(36).substr(2, 9),
                label: formData.label || "Home",
                address: formData.address!,
                buildingName: formData.buildingName,
                landmark: formData.landmark,
                lat: formData.lat || 0,
                lng: formData.lng || 0,
            }
            setAddresses([...addresses, newAddress])
            // Auto select user just added
            onSelect(newAddress)
        } else if (view === "EDIT" && editingAddress) {
            setAddresses(addresses.map(a => a.id === editingAddress.id ? { ...a, ...formData } as Address : a))
        }

        handleBack()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden gap-0">
                <DialogHeader className="p-6 pb-2 border-b">
                    <div className="flex items-center gap-2">
                        {view !== "LIST" && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 -ml-2" onClick={handleBack}>
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        )}
                        <div className="space-y-1">
                            <DialogTitle>
                                {view === "LIST" && "Select Location"}
                                {view === "ADD" && "Add New Address"}
                                {view === "EDIT" && "Edit Address"}
                            </DialogTitle>
                            <DialogDescription className="hidden">Address Management</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="p-6">
                    {view === "LIST" ? (
                        <AddressList
                            addresses={addresses}
                            selectedId={currentAddressId}
                            onSelect={(addr) => {
                                onSelect(addr)
                                onOpenChange(false)
                            }}
                            onAddNew={handleAddNew}
                            onEdit={handleEdit}
                        />
                    ) : (
                        <div className="space-y-4">
                            <MapPicker
                                onLocationSelect={handleLocationSelect}
                                initialLocation={editingAddress ? { lat: editingAddress.lat, lng: editingAddress.lng } : undefined}
                            />

                            <div className="space-y-2">
                                <Label>Label as</Label>
                                <div className="flex gap-2">
                                    {["Home", "Work", "Other"].map(l => (
                                        <Button
                                            key={l}
                                            type="button"
                                            variant={formData.label === l ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setFormData({ ...formData, label: l })}
                                        >
                                            {l}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Building Name / Flat No</Label>
                                    <Input
                                        placeholder="e.g. Sobha Iris, #402"
                                        value={formData.buildingName || ""}
                                        onChange={e => setFormData({ ...formData, buildingName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Landmark</Label>
                                    <Input
                                        placeholder="e.g. Near Metro Station"
                                        value={formData.landmark || ""}
                                        onChange={e => setFormData({ ...formData, landmark: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Complete Address</Label>
                                <Input
                                    value={formData.address || ""}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>

                            <Button className="w-full" onClick={handleSave}>
                                Save Address
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
