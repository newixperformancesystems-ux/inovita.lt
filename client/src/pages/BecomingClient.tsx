import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus, X, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
}

interface WorkingHours {
  from: string;
  to: string;
}

const DAYS = [
  { key: 'monday', label: 'Pirmadienis' },
  { key: 'tuesday', label: 'Antradienis' },
  { key: 'wednesday', label: 'Trečiadienis' },
  { key: 'thursday', label: 'Ketvirtadienis' },
  { key: 'friday', label: 'Penktadienis' },
  { key: 'saturday', label: 'Šeštadienis' },
  { key: 'sunday', label: 'Sekmadienis' },
];

export default function BecomingClient() {
  const [clientType, setClientType] = useState<'fizinis' | 'imone'>('fizinis');
  const [services, setServices] = useState<Service[]>([{ id: '1', name: '', duration: '60', price: '0' }]);
  const [workingHours, setWorkingHours] = useState<Record<string, WorkingHours>>({
    monday: { from: '08:00', to: '17:00' },
    tuesday: { from: '08:00', to: '17:00' },
    wednesday: { from: '08:00', to: '17:00' },
    thursday: { from: '08:00', to: '17:00' },
    friday: { from: '08:00', to: '17:00' },
    saturday: { from: '', to: '' },
    sunday: { from: '', to: '' },
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [dataChecked, setDataChecked] = useState(false);
  const [agreementError, setAgreementError] = useState(false);

  const addService = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setServices([...services, { id: newId, name: '', duration: '60', price: '0' }]);
  };

  const removeService = (id: string) => {
    if (services.length > 1) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const updateService = (id: string, field: keyof Service, value: string) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const updateWorkingHours = (day: string, field: 'from' | 'to', value: string) => {
    setWorkingHours({
      ...workingHours,
      [day]: { ...workingHours[day], [field]: value },
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!privacyChecked || !dataChecked) {
      setAgreementError(true);
      return;
    }
    
    setAgreementError(false);
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formDataObj: any = {
        clientType,
        firstName: (form.querySelector('#firstName') as HTMLInputElement).value,
        lastName: (form.querySelector('#lastName') as HTMLInputElement).value,
        phone: (form.querySelector('#phone') as HTMLInputElement).value,
        email: (form.querySelector('#email') as HTMLInputElement).value,
        experience: (form.querySelector('#experience') as HTMLTextAreaElement).value,
        workAddress: (form.querySelector('#workAddress') as HTMLInputElement).value,
        services,
        workingHours,
      };

      if (clientType === 'fizinis') {
        formDataObj.ivNumber = (form.querySelector('#ivNumber') as HTMLInputElement).value;
        formDataObj.pvmCode = (form.querySelector('#pvmCode') as HTMLInputElement).value;
        formDataObj.address = (form.querySelector('#addressFizinis') as HTMLInputElement).value;
      } else {
        formDataObj.companyName = (form.querySelector('#companyName') as HTMLInputElement).value;
        formDataObj.companyCode = (form.querySelector('#companyCode') as HTMLInputElement).value;
        formDataObj.companyPvm = (form.querySelector('#companyPvm') as HTMLInputElement).value;
        formDataObj.companyAddress = (form.querySelector('#companyAddress') as HTMLInputElement).value;
      }

      // Convert files to base64
      const attachments = await Promise.all(
        uploadedFiles.map(async (file) => ({
          filename: file.name,
          content: await fileToBase64(file),
        }))
      );

      const response = await fetch('https://api.inovita.lt/api/becoming-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData: formDataObj, attachments }),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setIsSubmitting(false);
      setShowSuccess(true);
      toast.success('Forma sėkmingai pateikta!');

      setTimeout(() => {
        setShowSuccess(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      console.error('Form submission error:', error);
      toast.error('Nepavyko pateikti formos. Bandykite vėliau.');
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0A0A0E]">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <Card className="max-w-md w-full text-center p-8 border border-[#A8FF3E]/40 bg-[#0A0A0E]">
            <div className="flex justify-center mb-4">
              <CheckCircle2 size={64} className="text-[#A8FF3E]" />
            </div>
            <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl font-bold mb-2 text-white">Ačiū!</h2>
            <p className="text-white/70 mb-6">
              Gavome jūsų užklausą. Netrukus susisieksime su jumis.
            </p>
            <Button onClick={() => window.location.reload()} className="w-full bg-[#A8FF3E] text-[#0A0A0E] hover:bg-[#bfff5e]">
              Grįžti
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0E] text-white">
      <Header />

      <main className="flex-1">
        <section className="py-12 md:py-16 bg-[#0A0A0E] border-b border-white/5">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 style={{ fontFamily: 'Syne, sans-serif' }} className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Tapkite <span className="text-[#A8FF3E]">„Inovita"</span> klientu
              </h1>
              <p className="text-lg text-white/60">
                Užpildykite anketą ir su jumis susisieksime dėl detalių, sutarties ir paslaugos įgyvendinimo.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <Card className="p-6 border border-[#A8FF3E]/20 bg-[#0A0A0E] hover:border-[#A8FF3E]/40 transition-colors">
                <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl font-bold mb-6 text-white">Kliento tipas</h2>
                <RadioGroup value={clientType} onValueChange={(v) => setClientType(v as 'fizinis' | 'imone')}>
                  <div className="flex items-center space-x-2 mb-4">
                    <RadioGroupItem value="fizinis" id="fizinis" className="border-white/20" />
                    <Label htmlFor="fizinis" className="cursor-pointer font-medium">Fizinis asmuo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="imone" id="imone" className="border-white/20" />
                    <Label htmlFor="imone" className="cursor-pointer font-medium">Įmonė</Label>
                  </div>
                </RadioGroup>
              </Card>

              <Card className="p-6 border border-[#A8FF3E]/20 bg-[#0A0A0E] hover:border-[#A8FF3E]/40 transition-colors">
                <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl font-bold mb-6 text-white">Kontaktinė informacija</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="mb-2 block">Vardas *</Label>
                    <Input id="firstName" placeholder="Jūsų vardas" required className="bg-white/5 border-white/10" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="mb-2 block">Pavardė *</Label>
                    <Input id="lastName" placeholder="Jūsų pavardė" required className="bg-white/5 border-white/10" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="mb-2 block">Telefono numeris *</Label>
                    <Input id="phone" type="tel" placeholder="+370 6XX XX XXX" required className="bg-white/5 border-white/10" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-2 block">El. paštas *</Label>
                    <Input id="email" type="email" placeholder="jūsų@el.paštas" required className="bg-white/5 border-white/10" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 border border-[#A8FF3E]/20 bg-[#0A0A0E] hover:border-[#A8FF3E]/40 transition-colors">
                <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl font-bold mb-6 text-white">Rekvizitai</h2>
                {clientType === 'fizinis' ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="ivNumber" className="mb-2 block">Individualios veiklos numeris</Label>
                      <Input id="ivNumber" placeholder="Jūsų IV numeris" className="bg-white/5 border-white/10" />
                    </div>
                    <div>
                      <Label htmlFor="pvmCode" className="mb-2 block">PVM kodas (nebūtinas)</Label>
                      <Input id="pvmCode" placeholder="PVM kodas" className="bg-white/5 border-white/10" />
                    </div>
                    <div>
                      <Label htmlFor="addressFizinis" className="mb-2 block">Adresas</Label>
                      <Input id="addressFizinis" placeholder="Jūsų adresas" className="bg-white/5 border-white/10" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="companyName" className="mb-2 block">Įmonės pavadinimas *</Label>
                      <Input id="companyName" placeholder="Įmonės pavadinimas" required className="bg-white/5 border-white/10" />
                    </div>
                    <div>
                      <Label htmlFor="companyCode" className="mb-2 block">Įmonės kodas *</Label>
                      <Input id="companyCode" placeholder="Įmonės kodas" required className="bg-white/5 border-white/10" />
                    </div>
                    <div>
                      <Label htmlFor="companyPvm" className="mb-2 block">PVM mokėtojo kodas *</Label>
                      <Input id="companyPvm" placeholder="PVM kodas" required className="bg-white/5 border-white/10" />
                    </div>
                    <div>
                      <Label htmlFor="companyAddress" className="mb-2 block">Įmonės adresas *</Label>
                      <Input id="companyAddress" placeholder="Įmonės adresas" required className="bg-white/5 border-white/10" />
                    </div>
                  </div>
                )}
              </Card>

              <Card className="p-6 border border-[#A8FF3E]/20 bg-[#0A0A0E] hover:border-[#A8FF3E]/40 transition-colors">
                <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl font-bold mb-6 text-white">Aprašymas apie specialistą</h2>
                <div>
                  <Label htmlFor="experience" className="mb-2 block">
                    Trumpai aprašykite savo patirtį, kvalifikaciją ir teikiamas paslaugas (5–6 sakiniai) *
                  </Label>
                  <Textarea id="experience" placeholder="Aprašykite jūsų patirtį ir paslaugas..." rows={5} required className="bg-white/5 border-white/10" />
                </div>
              </Card>

              <Card className="p-6 border border-[#A8FF3E]/20 bg-[#0A0A0E] hover:border-[#A8FF3E]/40 transition-colors">
                <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl font-bold mb-6 text-white">Paslaugos</h2>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="flex gap-4 items-end pb-4 border-b border-white/5 last:border-b-0">
                      <div className="flex-1">
                        <Label className="mb-2 block text-sm">Paslaugos pavadinimas *</Label>
                        <Input
                          placeholder="Paslaugos pavadinimas"
                          value={service.name}
                          onChange={(e) => updateService(service.id, 'name', e.target.value)}
                          required
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      <div className="w-32">
                        <Label className="mb-2 block text-sm">Trukmė (min.) *</Label>
                        <Input
                          type="text"
                          placeholder="60"
                          value={service.duration}
                          onChange={(e) => updateService(service.id, 'duration', e.target.value)}
                          required
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      <div className="w-32">
                        <Label className="mb-2 block text-sm">Kaina (€) *</Label>
                        <Input
                          type="text"
                          placeholder="0.00"
                          value={service.price}
                          onChange={(e) => updateService(service.id, 'price', e.target.value)}
                          required
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      {services.length > 1 && (
                        <button type="button" onClick={() => removeService(service.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-md transition">
                          <X size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <Button type="button" variant="outline" onClick={addService} className="mt-4 w-full border-white/10 hover:bg-white/5">
                  <Plus size={18} className="mr-2" /> Pridėti paslaugą
                </Button>
              </Card>

              <Card className="p-6 border border-[#A8FF3E]/20 bg-[#0A0A0E] hover:border-[#A8FF3E]/40 transition-colors">
                <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl font-bold mb-6 text-white">Nuotraukų įkėlimas</h2>
                <Label className="mb-4 block text-white/60">Darbų nuotraukos, „Prieš ir po" rezultatai, Logotipas</Label>
                <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-[#A8FF3E]/30 transition cursor-pointer bg-white/5 relative">
                  <input type="file" multiple onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" id="fileInput" accept="image/*" />
                  <p className="text-white/70 mb-2">Spustelėkite arba nutempkite failus čia</p>
                  <p className="text-sm text-white/40">JPG, PNG iki 10MB</p>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((file, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-[#A8FF3E]">
                        <CheckCircle2 size={16} /> {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              <Card className="p-6 border border-[#A8FF3E]/20 bg-[#0A0A0E] hover:border-[#A8FF3E]/40 transition-colors">
                <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl font-bold mb-6 text-white">Veiklos informacija</h2>
                <div className="mb-6">
                  <Label htmlFor="workAddress" className="mb-2 block text-white/80">Jūsų darbo vietos / salono adresas *</Label>
                  <Input id="workAddress" placeholder="Pvz., Vilniaus g. 1, Vilnius" required className="bg-white/5 border-white/10" />
                </div>
                <div>
                  <Label className="mb-4 block font-medium">Darbo laikas:</Label>
                  <div className="space-y-3">
                    {DAYS.map((day) => (
                      <div key={day.key} className="grid grid-cols-3 gap-4 items-end">
                        <Label className="text-sm">{day.label}</Label>
                        <Input type="text" placeholder="08:00" value={workingHours[day.key].from} onChange={(e) => updateWorkingHours(day.key, 'from', e.target.value)} className="bg-white/5 border-white/10" />
                        <Input type="text" placeholder="17:00" value={workingHours[day.key].to} onChange={(e) => updateWorkingHours(day.key, 'to', e.target.value)} className="bg-white/5 border-white/10" />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-6 border border-[#A8FF3E]/20 bg-[#0A0A0E] hover:border-[#A8FF3E]/40 transition-colors">
                <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl font-bold mb-6 text-white">Sutikimai</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox id="privacy" checked={privacyChecked} onCheckedChange={(checked) => setPrivacyChecked(checked as boolean)} className="border-white/20 data-[state=checked]:bg-[#A8FF3E] data-[state=checked]:text-[#0A0A0E]" />
                    <Label htmlFor="privacy" className="cursor-pointer text-sm leading-relaxed text-white/70">Sutinku su privatumo politika *</Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox id="data" checked={dataChecked} onCheckedChange={(checked) => setDataChecked(checked as boolean)} className="border-white/20 data-[state=checked]:bg-[#A8FF3E] data-[state=checked]:text-[#0A0A0E]" />
                    <Label htmlFor="data" className="cursor-pointer text-sm leading-relaxed text-white/70">Sutinku su asmens duomenų tvarkymu *</Label>
                  </div>
                </div>
                {agreementError && <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-500 text-sm">Turite sutikti su sąlygomis.</div>}
              </Card>

              <Button type="submit" size="lg" className="w-full bg-[#A8FF3E] text-[#0A0A0E] hover:bg-[#bfff5e] font-bold py-6 text-lg rounded-md transition-all" disabled={isSubmitting || (!privacyChecked || !dataChecked)}>
                {isSubmitting ? 'Siunčiama...' : 'Pateikti paraišką'}
              </Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
