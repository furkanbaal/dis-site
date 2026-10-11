# Minik Diş — Çocuk Diş Kliniği

Pastel renkler, yumuşak mikro animasyonlar ve çocuk dostu bir randevu akışıyla hazırlanmış pedodonti kliniği ana sayfası.

## Teknoloji

- Next.js App Router + TypeScript
- Tailwind CSS 4
- Framer Motion
- lucide-react

## Geliştirme

```bash
npm install
cp .env.example .env.local   # değerleri doldurun
npm run dev
```

Üretim derlemesini doğrulamak için:

```bash
npm run typecheck
npm run build
```

## Yayına almadan önce yapılacaklar

Sitedeki tüm iletişim bilgileri **tek bir dosyadan** yönetilir: `lib/site-config.ts`.
Buradaki bir değeri değiştirdiğinizde üst menü, alt bilgi, yapılandırılmış veri
(JSON-LD), site haritası ve randevu bölümü aynı anda güncellenir.

1. **İletişim bilgilerini girin.** `siteConfig.contact` (telefon, e-posta, adres)
   ve `siteConfig.hours` (çalışma saatleri) alanlarını gerçek bilgilerle doldurun.
2. **Örnek veri bayrağını kapatın.** `lib/site-config.ts` içindeki `isSampleData`
   değerini `false` yapın. Bu bayrak `true` iken alt bilgide "bilgiler örnektir"
   uyarısı görünür.
3. **Alan adını tanımlayın.** `NEXT_PUBLIC_SITE_URL` değişkenini gerçek adrese
   ayarlayın. Bu değer canonical etikette, paylaşım kartlarında, `sitemap.xml`,
   `robots.txt` ve JSON-LD içinde kullanılır.
4. **Ekip ve hizmet içeriklerini gözden geçirin.** `components/TeamSection.tsx`,
   `components/ServicesSection.tsx` ve `components/BlogSection.tsx` dosyalarındaki
   metinleri kliniğinize göre güncelleyin. Blog yazıları genel bilgilendirme
   amaçlıdır; hekim onayından geçirilmesi önerilir.
5. **Randevu iletimini bağlayın** (aşağıya bakın).

## Randevu formu nasıl çalışır?

İstemci tarafı `components/BookingSection.tsx`, sunucu tarafı
`app/api/appointments/route.ts` dosyasındadır. Seçenekler ve doğrulama kuralları
`lib/booking.ts` içinde **tek bir kaynaktan** gelir; aynı kurallar hem tarayıcıda
hem sunucuda çalıştığı için iki taraf çelişemez.

Bir talep geldiğinde sırayla:

1. **Bot tuzağı** ve **hız sınırı** (IP başına 10 dakikada 5 talep) uygulanır.
2. Veri sunucuda yeniden doğrulanır — tarayıcı doğrulaması atlatılsa bile geçersiz
   kayıt kabul edilmez.
3. Talep, `APPOINTMENT_WEBHOOK_URL` tanımlıysa oraya JSON olarak POST edilir
   (Slack, Zapier, n8n, kendi API'niz…).
4. Sunucu üzerinde çalışıyorsa talep ayrıca `data/appointments.ndjson` dosyasına
   eklenir. Bu dosya `.gitignore` içindedir (kişisel veri içerir).

Form, talebin gerçekten iletildiğini doğrulamadan başarı mesajı göstermez.
Webhook ve yerel kayıt ikisi de başarısız olursa kullanıcıya klinik telefonu
gösterilir. Yani "gönderildi" mesajı her zaman doğrudur.

### Daha ileri seviye seçenekler

- **E-posta ile iletim:** Bir e-posta servisinin (Resend, Postmark, SendGrid)
  API'sini `forwardToWebhook` fonksiyonunun yerine ekleyebilirsiniz.
- **Veritabanı:** Yerel dosya günlüğü tek sunuculu kurulumlar için pratiktir.
  Çok sunuculu/ölçekli kurulumda `persistLocally` yerine bir veritabanı
  (Postgres, Supabase, Airtable…) kullanın. Sunucusuz ortamlarda dosya sistemi
  salt okunur olduğundan yerel kayıt otomatik atlanır.

## SEO ve erişilebilirlik

- `app/sitemap.ts` → `/sitemap.xml`, `app/robots.ts` → `/robots.txt`
- `lib/structured-data.ts` → `Dentist` + `WebSite` JSON-LD (Google bilgi kartı için)
- `app/opengraph-image.tsx` → sosyal paylaşım kartı (derleme sırasında PNG üretir)
- `components/MotionProvider.tsx` → işletim sisteminde "hareketi azalt" açıksa
  animasyonlar otomatik sadeleşir
- Blog penceresi klavye ile tam kullanılabilir: odak tuzağı, `Esc` ile kapatma
  ve kapanışta odağın geri verilmesi

## Bilinen eksikler

- Randevu talepleri varsayılan olarak yalnızca konsola ve yerel dosyaya yazılır;
  yayına almadan önce `APPOINTMENT_WEBHOOK_URL` tanımlanmalı veya bir e-posta
  servisi bağlanmalıdır.
- KVKK aydınlatma metni ve gizlilik politikası sayfaları henüz yoktur.
  Form onay kutusu, bu sayfalar eklendiğinde ilgili bağlantıyla güncellenmelidir.
- Görsel varlıklar SVG ve emoji ile üretilmiştir; gerçek klinik fotoğrafları
  eklendiğinde `next/image` ile optimize edilmelidir.
