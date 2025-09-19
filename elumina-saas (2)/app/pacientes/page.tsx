"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Patient {
  id: number
  name: string
  phone: string
  email?: string
  last_visit?: string
  return_recommendation?: string
  notes?: string
  created_at: string
}

export default function PacientesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [pacientes, setPacientes] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    telefone: "",
    email: "",
    dataUltimaVisita: "",
    recomendacaoRetorno: "",
    notasAdicionais: "",
  })

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/patients")
      const data = await response.json()

      if (response.ok) {
        setPacientes(data.patients || [])
      } else {
        console.error("[v0] Erro ao buscar pacientes:", data.error)
      }
    } catch (error) {
      console.error("[v0] Erro ao buscar pacientes:", error)
    } finally {
      setLoading(false)
    }
  }

  const pacientesFiltrados = pacientes.filter(
    (paciente) => paciente.name.toLowerCase().includes(searchTerm.toLowerCase()) || paciente.phone.includes(searchTerm),
  )

  const resetForm = () => {
    setFormData({
      nomeCompleto: "",
      telefone: "",
      email: "",
      dataUltimaVisita: "",
      recomendacaoRetorno: "",
      notasAdicionais: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSalvarPaciente = async () => {
    try {
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchPatients()
        setIsModalOpen(false)
        resetForm()
      } else {
        const data = await response.json()
        console.error("[v0] Erro ao salvar paciente:", data.error)
      }
    } catch (error) {
      console.error("[v0] Erro ao salvar paciente:", error)
    }
  }

  const handleCancelar = () => {
    setIsModalOpen(false)
    resetForm()
  }

  return (
    <div className="flex-1 ml-64 p-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Gestão de Pacientes</h1>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar paciente por nome ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Adicionar Paciente
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Cadastrar Novo Paciente</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nomeCompleto">Nome Completo do Paciente</Label>
                  <Input
                    id="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={(e) => handleInputChange("nomeCompleto", e.target.value)}
                    placeholder="Digite o nome completo"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="telefone">Telefone (com WhatsApp)</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange("telefone", e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail (Opcional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="exemplo@email.com"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="dataUltimaVisita">Data da Última Visita</Label>
                  <Input
                    id="dataUltimaVisita"
                    type="date"
                    value={formData.dataUltimaVisita}
                    onChange={(e) => handleInputChange("dataUltimaVisita", e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="recomendacaoRetorno">Recomendação de Retorno</Label>
                  <Select
                    value={formData.recomendacaoRetorno}
                    onValueChange={(value) => handleInputChange("recomendacaoRetorno", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nao-definido">Não definido</SelectItem>
                      <SelectItem value="3-meses">A cada 3 meses</SelectItem>
                      <SelectItem value="6-meses">A cada 6 meses</SelectItem>
                      <SelectItem value="12-meses">A cada 12 meses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notasAdicionais">Notas Adicionais</Label>
                  <Textarea
                    id="notasAdicionais"
                    value={formData.notasAdicionais}
                    onChange={(e) => handleInputChange("notasAdicionais", e.target.value)}
                    placeholder="Digite observações ou notas importantes sobre o paciente..."
                    className="min-h-20"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={handleCancelar}>
                  Cancelar
                </Button>
                <Button onClick={handleSalvarPaciente}>Salvar Paciente</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="p-6">
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Carregando pacientes...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do Paciente</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Data da Última Visita</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pacientesFiltrados.map((paciente) => (
                  <TableRow key={paciente.id}>
                    <TableCell className="font-medium">{paciente.name}</TableCell>
                    <TableCell>{paciente.phone}</TableCell>
                    <TableCell>
                      {paciente.last_visit
                        ? new Date(paciente.last_visit).toLocaleDateString("pt-BR")
                        : "Não informado"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {!loading && pacientesFiltrados.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhum paciente encontrado com os critérios de busca.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
