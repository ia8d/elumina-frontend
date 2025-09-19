import { Button } from "@/components/ui/button"
import { Save, RotateCcw } from "lucide-react"

export function SettingsActions() {
  return (
    <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
      <Button variant="outline" size="lg">
        <RotateCcw className="w-4 h-4 mr-2" />
        Cancelar
      </Button>
      <Button size="lg">
        <Save className="w-4 h-4 mr-2" />
        Salvar Configurações
      </Button>
    </div>
  )
}
