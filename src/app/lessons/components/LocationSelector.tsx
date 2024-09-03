import { getLocationList } from "@/app/api"
import { ILocation } from "@/app/api/types"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LocationSelector: React.FC<{
  currentLocation: ILocation | null
  onSelect: (location: ILocation) => void
}> = ({ currentLocation, onSelect }) => {
  const { data: locations } = useSuspenseQuery<ILocation[]>({
    queryKey: ['locations'],
    queryFn: getLocationList,
  })

  useEffect(() => {
    if (locations && locations.length > 0 && !currentLocation) {
      onSelect(locations[0])
    }
  }, [locations, currentLocation, onSelect])

  return (
    <div className="mb-4">
      {/* Mobile dropdown */}
      <div className="sm:hidden">
        <Select
          value={currentLocation?.id.toString()}
          onValueChange={(value) => {
            const selected = locations.find(loc => loc.id.toString() === value)
            if (selected) onSelect(selected)
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="위치를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location.id} value={location.id.toString()}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop buttons */}
      <div className="hidden sm:flex flex-wrap gap-2">
        {locations.map((location) => (
          <button
            key={location.id}
            onClick={() => onSelect(location)}
            className={`px-4 py-2 text-base border rounded ${currentLocation?.id === location.id
              ? 'text-blue-500 border-blue-500'
              : 'text-gray-700 border-gray-300'
              }`}
          >
            {location.name}
          </button>
        ))}
      </div>
    </div >
  )
}

export default LocationSelector
