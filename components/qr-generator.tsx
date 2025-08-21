import type React from "react"

'use client';

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  QrCode,
  Download,
  Upload,
  Palette,
  Info,
  X,
  ArrowRight,
  ChevronUp,
  CreditCard,
  Wifi,
  Calendar,
  MessageSquare,
  Mail,
  FileText,
} from "lucide-react"
import QRCode from "qrcode"

interface QROptions {
  text: string
  size: number
  foregroundColor: string
  backgroundColor: string
  logo?: string
}

interface Template {
  id: string
  name: string
  fields: { id: string; label: string; placeholder: string; value: string }[]
  preview: string
}

const templates: Template[] = [
  {
    id: "business-card",
    name: "Kartu Bisnis",
    fields: [
      { id: "name", label: "Nama", placeholder: "Masukkan nama Anda", value: "" },
      { id: "company", label: "Perusahaan", placeholder: "Nama perusahaan", value: "" },
      { id: "phone", label: "Telepon", placeholder: "+62 xxx-xxx-xxxx", value: "" },
      { id: "email", label: "Email", placeholder: "email@domain.com", value: "" },
    ],
    preview: "VCARD:BEGIN:VCARD\nVERSION:3.0\nFN:{name}\nORG:{company}\nTEL:{phone}\nEMAIL:{email}\nEND:VCARD",
  },
  {
    id: "wifi",
    name: "WiFi",
    fields: [
      { id: "ssid", label: "Nama WiFi (SSID)", placeholder: "Nama jaringan WiFi", value: "" },
      { id: "password", label: "Password", placeholder: "Password WiFi", value: "" },
      { id: "security", label: "Keamanan", placeholder: "WPA/WEP/nopass", value: "WPA" },
    ],
    preview: "WIFI:T:{security};S:{ssid};P:{password};;",
  },
  {
    id: "event",
    name: "Event",
    fields: [
      { id: "title", label: "Judul Event", placeholder: "Nama acara", value: "" },
      { id: "location", label: "Lokasi", placeholder: "Alamat lokasi", value: "" },
      { id: "date", label: "Tanggal", placeholder: "YYYY-MM-DD", value: "" },
      { id: "time", label: "Waktu", placeholder: "HH:MM", value: "" },
    ],
    preview: "BEGIN:VEVENT\nSUMMARY:{title}\nLOCATION:{location}\nDTSTART:{date}T{time}00\nEND:VEVENT",
  },
  {
    id: "sms",
    name: "SMS",
    fields: [
      { id: "phone", label: "Nomor Telepon", placeholder: "+62 xxx-xxx-xxxx", value: "" },
      { id: "message", label: "Pesan", placeholder: "Tulis pesan Anda", value: "" },
    ],
    preview: "SMSTO:{phone}:{message}",
  },
  {
    id: "email",
    name: "Email",
    fields: [
      { id: "to", label: "Kepada", placeholder: "email@domain.com", value: "" },
      { id: "subject", label: "Subjek", placeholder: "Subjek email", value: "" },
      { id: "body", label: "Isi Pesan", placeholder: "Tulis pesan email", value: "" },
    ],
    preview: "mailto:{to}?subject={subject}&body={body}",
  },
]

interface OnboardingStep {
  target: string
  title: string
  description: string
  image: string
}

const onboardingSteps = [
  {
    target: 'template-selector',
    title: 'Pilih Template',
    description: 'Pilih template QR Code yang Anda inginkan.',
    image: '/onboarding/1.png'
  },
  {
    target: 'generate-button',
    title: 'Isi Data',
    description: 'Isi kolom yang diperlukan, lalu klik tombol Generate QR Code.',
    image: '/onboarding/2.png'
  },
  {
    target: 'customization-panel',
    title: 'Kustomisasi QR Code',
    description: 'Sesuaikan tampilan QR Code Anda dengan fitur kustomisasi.',
    image: '/onboarding/3.png'
  },
  {
    target: 'download-button',
    title: 'Unduh QR Code',
    description: 'Unduh QR Code dalam dua format file: PNG atau SVG.',
    image: '/onboarding/4.png'
  }
]

const getTemplateIcon = (templateId: string) => {
  switch (templateId) {
    case "business-card":
      return <CreditCard className="h-4 w-4" />
    case "wifi":
      return <Wifi className="h-4 w-4" />
    case "event":
      return <Calendar className="h-4 w-4" />
    case "sms":
      return <MessageSquare className="h-4 w-4" />
    case "email":
      return <Mail className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

export function QRGenerator() {
  const [options, setOptions] = useState<QROptions>({
    text: "https://example.com",
    size: 256,
    foregroundColor: "#000000",
    backgroundColor: "#ffffff",
  })

  const [selectedTemplate, setSelectedTemplate] = useState<string>("custom")
  const [templateData, setTemplateData] = useState<{ [key: string]: Template }>(() => {
    const initialData: { [key: string]: Template } = {}
    templates.forEach((template) => {
      initialData[template.id] = { ...template }
    })
    return initialData
  })

  const [qrDataURL, setQrDataURL] = useState<string>("")
  const [svgDataURL, setSvgDataURL] = useState<string>("")
  const [alert, setAlert] = useState<{ type: "error" | "success" | "info"; message: string } | null>(null)
  const [isOnboarding, setIsOnboarding] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  
  // Cek apakah onboarding sudah pernah ditampilkan
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding')
    if (!hasSeenOnboarding) {
      setIsOnboarding(true)
      // Tandai bahwa user sudah melihat onboarding
      localStorage.setItem('hasSeenOnboarding', 'true')
    }
  }, [])
  
  // Disable scroll when onboarding is active
  useEffect(() => {
    if (isOnboarding) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup function to re-enable scroll when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOnboarding]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showGoToTop, setShowGoToTop] = useState(false)
  const [img, setImg] = useState<HTMLImageElement | null>(null)

  const showAlert = (type: "error" | "success" | "info", message: string) => {
    setAlert({ type, message })
    setTimeout(() => setAlert(null), 3000)
  }

  const generateTemplateText = (templateId: string): string => {
    if (templateId === "custom") return options.text

    const template = templateData[templateId]
    if (!template) return options.text

    let text = template.preview
    template.fields.forEach((field) => {
      text = text.replace(new RegExp(`{${field.id}}`, "g"), field.value || field.placeholder)
    })
    return text
  }

  const generateQR = async () => {
    const textToGenerate = selectedTemplate === "custom" ? options.text : generateTemplateText(selectedTemplate)

    if (!textToGenerate.trim()) {
      showAlert("error", "Teks tidak boleh kosong")
      return
    }

    try {
      const canvas = canvasRef.current
      if (!canvas) return

      const qrOptions: any = {
        width: options.size,
        color: {
          dark: options.foregroundColor,
          light: options.backgroundColor,
        },
        margin: 2,
      }

      await QRCode.toCanvas(canvas, textToGenerate, qrOptions)

      // Apply logo overlay if exists
      if (options.logo) {
        const ctx = canvas.getContext("2d")
        if (ctx) {
          const logoSize = options.size * 0.2
          const x = (options.size - logoSize) / 2
          const y = (options.size - logoSize) / 2

          ctx.fillStyle = options.backgroundColor
          ctx.fillRect(x - 5, y - 5, logoSize + 10, logoSize + 10)
          if (img) {
            ctx.drawImage(img, x, y, logoSize, logoSize)
          }

          const dataURL = canvas.toDataURL("image/png")
          setQrDataURL(dataURL)
        }
      } else {
        const dataURL = canvas.toDataURL("image/png")
        setQrDataURL(dataURL)
      }

      // Generate SVG version
      const svgString = await QRCode.toString(textToGenerate, {
        type: "svg",
        width: options.size,
        color: {
          dark: options.foregroundColor,
          light: options.backgroundColor,
        },
        margin: 2,
      })

      const svgBlob = new Blob([svgString], { type: "image/svg+xml" })
      const svgUrl = URL.createObjectURL(svgBlob)
      setSvgDataURL(svgUrl)

      showAlert("success", "QR Code berhasil digenerate!")
    } catch (error) {
      console.error("[v0] QR generation error:", error)
      showAlert("error", "Gagal membuat QR Code")
    }
  }

  const downloadQR = (format: "png" | "svg") => {
    const link = document.createElement("a")
    link.download = `qrcode-qreat.${format}`

    if (format === "png" && qrDataURL) {
      link.href = qrDataURL
    } else if (format === "svg" && svgDataURL) {
      link.href = svgDataURL
    } else {
      showAlert("error", "QR Code belum siap untuk diunduh")
      return
    }

    link.click()
    showAlert("info", `QR Code berhasil diunduh dalam format ${format.toUpperCase()}`)
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        showAlert("error", "Ukuran file terlalu besar. Maksimal 2MB")
        return
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        showAlert("error", "File harus berupa gambar")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setOptions((prev) => ({ ...prev, logo: e.target?.result as string }))
        const image = new Image()
        image.src = e.target?.result as string
        image.onload = () => setImg(image)
        showAlert("success", "Logo berhasil diupload")
      }
      reader.onerror = () => {
        showAlert("error", "Gagal membaca file logo")
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setOptions((prev) => ({ ...prev, logo: undefined }))
    setImg(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    showAlert("info", "Logo dihapus")
  }

  const updateTemplateField = (templateId: string, fieldId: string, value: string) => {
    setTemplateData((prev) => ({
      ...prev,
      [templateId]: {
        ...prev[templateId],
        fields: prev[templateId].fields.map((field) => (field.id === fieldId ? { ...field, value } : field)),
      },
    }))
  }

  // Handle scroll lock and scroll to element when step changes
  useEffect(() => {
    if (isOnboarding) {
      // Lock scroll
      document.body.style.overflow = 'hidden';
      
      // Scroll to top when step changes
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Cleanup function to re-enable scroll when component unmounts
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [currentStep, isOnboarding]);

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOnboarding(false);
    }
  }

  const skipOnboarding = () => {
    setIsOnboarding(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowGoToTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (selectedTemplate === "custom" ? options.text : generateTemplateText(selectedTemplate)) {
      generateQR()
    }
  }, [options, selectedTemplate, templateData])

  const OnboardingOverlay = () => {
    if (!isOnboarding) return null
    const step = onboardingSteps[currentStep]
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl border border-gray-100 dark:border-gray-700 transform transition-all duration-300 scale-95 hover:scale-100">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="bg-[#00cdb6] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
                {currentStep + 1}
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">{step.title}</h3>
            </div>
            <button 
              onClick={skipOnboarding}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              aria-label="Tutup panduan"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Content */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-base leading-relaxed">
              {step.description}
            </p>
            {step.image && (
              <div className="relative group overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 shadow-lg">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              {onboardingSteps.map((_, index) => (
                <div 
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep 
                      ? 'bg-[#00cdb6] w-6' 
                      : 'bg-gray-200 dark:bg-gray-700 w-2'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextStep}
              className="bg-gradient-to-r from-[#00cdb6] to-[#00b4a0] hover:from-[#00b4a0] hover:to-[#00a08f] text-white font-medium px-6 py-2.5 rounded-xl flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#00cdb6]/20"
            >
              <span>{currentStep === onboardingSteps.length - 1 ? 'Selesai' : 'Lanjut'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen relative">
        {/* Background with pattern and overlay */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/patern.jpg)' }}></div>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
        
        {/* Content container */}
        <div className="relative z-10">
        {alert && (
          <Alert
            className={`fixed top-4 right-4 z-40 w-auto ${
              alert.type === "error"
                ? "border-destructive bg-destructive/10"
                : alert.type === "success"
                  ? "border-primary bg-primary/10"
                  : "border-primary bg-primary/10"
            }`}
          >
            <AlertDescription
              className={
                alert.type === "error" ? "text-destructive" : alert.type === "success" ? "text-primary" : "text-primary"
              }
            >
              {alert.message}
            </AlertDescription>
          </Alert>
        )}

        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <QrCode className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-montserrat mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight px-4">
              Buat QR Code Kustom dengan Mudah
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 font-semibold px-4">
              Gratis, cepat, dan siap digunakan untuk berbagai keperluan.
            </p>
            <div className="max-w-3xl mx-auto text-muted-foreground mb-8 px-4">
              <p className="text-base sm:text-lg text-center">
                Hasilkan QR code profesional dengan berbagai pilihan template. Tambahkan logo, sesuaikan warna, dan unduh dalam format PNG atau SVG.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 sm:px-6">
            {/* Input Section */}
            <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-montserrat text-primary">
                  <QrCode className="h-5 w-5" />
                  Generate QR Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="template-selector">Pilih Template</Label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger id="template-selector">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Teks Bebas
                        </div>
                      </SelectItem>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          <div className="flex items-center gap-2">
                            {getTemplateIcon(template.id)}
                            {template.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedTemplate === "custom" ? (
                  <div className="space-y-2">
                    <Label htmlFor="url-input">URL atau Teks</Label>
                    <Input
                      id="url-input"
                      placeholder="Masukkan URL atau teks..."
                      value={options.text}
                      onChange={(e) => setOptions((prev) => ({ ...prev, text: e.target.value }))}
                      className="text-lg"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Label>Isi Data Template</Label>
                    {templateData[selectedTemplate]?.fields.map((field) => (
                      <div key={field.id} className="space-y-2">
                        <Label htmlFor={field.id}>{field.label}</Label>
                        <Input
                          id={field.id}
                          placeholder={field.placeholder}
                          value={field.value}
                          onChange={(e) => updateTemplateField(selectedTemplate, field.id, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  id="generate-button"
                  onClick={generateQR}
                  className="w-full text-lg py-6 font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-primary/20 transition-all duration-200"
                  size="lg"
                >
                  <QrCode className="mr-2 h-5 w-5" />
                  Generate QR Code
                </Button>

                {/* Customization Panel */}
                <Card id="customization-panel" className="border-muted">
                  <CardHeader>
                    <CardTitle className="text-lg font-montserrat text-primary">Kustomisasi</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Colors */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Label className="flex items-center gap-2 cursor-help">
                              <Palette className="h-4 w-4" />
                              Warna QR Code
                              <Info className="h-3 w-3" />
                            </Label>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Pilih warna QR Code Anda</p>
                          </TooltipContent>
                        </Tooltip>
                        <Input
                          type="color"
                          value={options.foregroundColor}
                          onChange={(e) => setOptions((prev) => ({ ...prev, foregroundColor: e.target.value }))}
                          className="h-12 cursor-pointer"
                        />
                      </div>
                      <div className="space-y-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Label className="flex items-center gap-2 cursor-help">
                              <Palette className="h-4 w-4" />
                              Warna Latar
                              <Info className="h-3 w-3" />
                            </Label>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Pilih warna latar belakang</p>
                          </TooltipContent>
                        </Tooltip>
                        <Input
                          type="color"
                          value={options.backgroundColor}
                          onChange={(e) => setOptions((prev) => ({ ...prev, backgroundColor: e.target.value }))}
                          className="h-12 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Size */}
                    <div className="space-y-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label className="flex items-center gap-2 cursor-help">
                            Ukuran: {options.size}px
                            <Info className="h-3 w-3" />
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Atur ukuran QR Code</p>
                        </TooltipContent>
                      </Tooltip>
                      <Slider
                        value={[options.size]}
                        onValueChange={([value]) => setOptions((prev) => ({ ...prev, size: value }))}
                        min={128}
                        max={512}
                        step={32}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Small</span>
                        <span>Medium</span>
                        <span>Large</span>
                      </div>
                    </div>

                    {/* Logo Upload */}
                    <div className="space-y-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label className="flex items-center gap-2 cursor-help">
                            <Upload className="h-4 w-4" />
                            Upload Logo
                            <Info className="h-3 w-3" />
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Tambahkan logo di tengah QR Code (max 2MB)</p>
                        </TooltipContent>
                      </Tooltip>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex-1">
                          <Upload className="mr-2 h-4 w-4" />
                          Pilih Logo
                        </Button>
                        {options.logo && (
                          <Button variant="outline" size="icon" onClick={removeLogo}>
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      {options.logo && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-8 h-8 rounded border overflow-hidden">
                            <img
                              src={options.logo || "/placeholder.svg"}
                              alt="Logo preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span>Logo uploaded</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Preview Section */}
            <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-montserrat text-primary">Preview & Download</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center p-8 bg-muted/30 rounded-2xl">
                  <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto border border-border rounded-lg shadow-lg"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>

                {qrDataURL && (
                  <div className="space-y-3">
                    <Button
                      id="download-button"
                      onClick={() => downloadQR("png")}
                      className="w-full text-lg py-6 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
                      size="lg"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download PNG
                    </Button>
                    <Button
                      onClick={() => downloadQR("svg")}
                      variant="outline"
                      className="w-full text-lg py-6 font-semibold border-primary text-primary hover:bg-primary/10"
                      size="lg"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download SVG
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <Button
          onClick={scrollToTop}
          className={`go-to-top ${showGoToTop ? "visible" : ""} bg-primary hover:bg-primary/90`}
          size="icon"
          variant="default"
        >
          <ChevronUp className="h-4 w-4" />
        </Button>

        <OnboardingOverlay />
      </div>
      </div>
    </TooltipProvider>
  )
}
