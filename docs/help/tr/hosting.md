---
title: Sunucular ve pull request'ler
category: Eşitleme ve çoklu depo
order: 56
summary: PR'ları her yerde oluşturun; GitHub ve GitLab'da inceleyip birleştirin.
keywords: pull request PR merge request birleştirme isteği inceleme onay issue konu GitHub GitLab Bitbucket Azure DevOps review approve merge issues
---

# Sunucular ve pull request'ler

## Oluşturma

Uygulamadan çıkmadan bir pull (ya da merge) request oluşturun: dal açılır
listeleri, dalın commit'lerinden önceden doldurulmuş başlık ve gövde, taslak
düğmesi ve — GitHub'da — oluştururken uygulanan inceleyiciler, etiketler ve
atananlar.

![Bir pull request oluşturma](../../screenshots/create-pr.webp)

**GitHub, GitLab, Bitbucket ve Azure DevOps** üzerinde çalışır. Dördünün de açık
PR/MR'ları kenar çubuğunda listelenir.

Dal karşılaştırmasından, grafikten, PR panelindeki `+` düğmesinden ya da bir
issue'dan başlatın (issue `Closes #N` satırını sizin için doldurur).

## Listedeki yığınlar

Birbirinin üstünde duran pull request'ler tek bir satıra katlanır: yığın
simgesi, zincirin indiği dal ve kaç tane olduğu. Açtığında zinciri okuma
sırasıyla görürsün — yapraktan tabana — ve her satırın altında neye merge
olduğunu söyleyen küçük bir ok olur; yön ekranda durur, dört temele bakıp
çıkarılmaz.

O grubu iki şey oluşturur: pull request'ler bir [yerel yığına](stacks.md) aitse
GitHub'ın kendi yığın numarası; değilse ref'lerin kendisi — temeli bir başkasının
ucu olan pull request onun üstünde durur. İkinci kural, bunun GitLab, Bitbucket
ve Azure DevOps'ta da çalışmasının sebebidir.

![Pull request listesindeki bir yığın](../../screenshots/pr-stack-list.webp)

Her satır kendi ucundaki **kontrollerin** durumunu taşır — sayılar için üzerine
gel — ve GitHub'da ayrıca çoktan kapanmış ya da merge edilmiş katmanları da; açık
PR listesi bunları gizlerdi. **Kapalı** bir katmanın üstündeki katman engellenmiş
olarak işaretlenir: kendi kontrolleri yeşil olabilir, ama hedeflediği dal asla
inmeyecektir. Satırın eylemleri üzerine gelince çıkar, başlık genişliğini korusun
diye.

Kontrolleri okumak pull request başına bir istek eder, o da yalnızca liste
yenilenince.

## Bir fork’un üst deposundaki pull request’leriniz

Bir fork’ta önemli olan pull request’ler genellikle fork aldığınız depoda
açtıklarınızdır ve onlar sizin fork’unuzda değil, orada durur. Bu yüzden bir
deponun `origin`’den farklı bir GitHub deposunu gösteren bir `upstream` uzak
deposu varsa, liste `upstream`’den de açık pull request’leri ister ve **yalnızca
dalı sizin fork’unuzdan gelenleri** tutar. Bunlar fork’unuzunkilerin altında, üst
deponun adını taşıyan bir başlık altında görünür: **owner/repo üzerinde**. Bir
tıklama, aynı ayrıntı görünümünü kontrolleri ve incelemesiyle üst depoda açar.

![Fork’un kendi pull request’i, altında üst depodaki pull request’leri, On example/pr-ready-branch altında](../../screenshots/fork-upstream-prs.webp)

*Sınırlar:* yalnızca GitHub ve yalnızca `upstream` adlı bir uzak depo. Üst
deponun diğer pull request’leri bilerek dışarıda bırakılır: o, onun kuyruğudur,
sizin işiniz değil. Yığınlar ve dal aramaları hâlâ yalnızca `origin` listesiyle
çalışır. Üst depoyu listelemek her yenilemede bir istek daha demektir.

## İnceleme — GitHub ve GitLab

| | |
|---|---|
| **Konuşma** | Yorumlar ve inceleme durumu |
| **Kontroller** | Geçti/kaldı/beklemede durumlarıyla CI kontrol çalıştırmaları (GitHub) ya da pipeline işleri (GitLab) ve günlükleri görüntüleme bağlantıları |
| **Görülen dosyalar** | Dosya başına ✓ kontrol listesi ve ilerleme |
| **Satır içi başlıklar** | `file:line`'a göre gruplanmış satır yorumları ve yanıtları |
| **Eylemler** | Yorum yapma, onaylama, değişiklik isteme ve merge / squash |

İncelemenin ortasında biri force push ederse, [o zamandan beri ne değişti](range-diff.md)
size tam olarak neyin kaydığını gösterir.

GitLab farkları, açıkça söylersek: GitLab'da tek bir "incelemeyi gönder"
çağrısı yok; bu yüzden **onaylama** onun onay uç noktasını kullanır,
**değişiklik isteme** ise onayınızı kaldırıp yorumunuzu gönderir.
**Rebase-merge** sunulmaz — GitLab, merge commit mi fast-forward mü olacağına
projenin ayarlarından karar verir; bu yüzden merge menüsünde yalnızca merge ve
squash görünür. Satır içi başlıklar dosyayı ve satırı gösterir ama çevresindeki
diff hunk'ını göstermez; GitLab'ın API'si bunu döndürmez. İnceleme/birleştirme,
**gitlab.com** üzerindeki projeler için çalışır; kendi sunucunuzda barındırılan
örnekler henüz desteklenmiyor. Bitbucket ve Azure DevOps inceleme için hâlâ
tarayıcıda açılır.

## Kendi sunucunuzdaki GitLab

Bir şirket GitLab’ı kendi adresinde yaşar. Bu adresi bir profile **Ayarlar →
Entegrasyonlar → GitLab → GitLab adresi** altında verin; örneğin
`git.example.org` ya da bir yol altında sunuluyorsa
`https://example.net/gitlab`. Bundan sonra o sunucudaki uzak depolar GitLab’dır:
merge request’ler listelenir, açılır, incelenir ve birleştirilir, klon tarayıcısı
ve *Depo oluştur* onunla konuşur, push ve fetch o profilin token’ıyla oturum açar.

**Bir GitLab token’ı tek bir örneğe aittir.** Bir profilin token’ı yalnızca o
profilin belirttiği adrese gönderilir. Adres boşsa bu gitlab.com demektir. Bir
gitlab.com token’ı şirket sunucusuna hiç ulaşmaz, bir şirket token’ı da
gitlab.com’a. İş ve kişisel hesaplar farklı örneklerdeyse her birine kendi
profilini verin. Bir profile bağlı depo o profilin örneğini kullanır.

**Token oluştur**, örneğinizin token sayfasını `api` ve `write_repository` önceden
seçili olarak açar. Salt okunur bir token sorunsuz bağlanır, sonra ilk push’ta
başarısız olur.

Sınırlar:

- **Yalnızca https.** Düz bir `http://` adresi reddedilir; aksi halde token ağda
  açık metin olarak dolaşırdı.
- **Profil başına bir GitLab örneği.** İkinci bir örnek için ikinci bir profil
  ekleyin.
- ssh üzerinden yol değil sunucu karşılaştırılır; bu nedenle aynı sunucuda farklı
  yollardaki iki örnek, bir ssh uzak deposu için ayırt edilemez.
- Uzak depo avatarları yalnızca gitlab.com ve github.com için çizilir. Kendi
  sunucunuzdaki bir uzak depo düz simgeyi alır; böylece grup adları hiçbir zaman
  herkese açık bir sunucuya gönderilmez.

## Forgejo

Token’ı girmeden önce örneğin adresini ayarlayın. Adresi değiştirmek önceki oturumu siler.

![Forgejo entegrasyon ayarları](../../screenshots/forgejo-integration.webp)

Forgejo — ve aynı API’yi paylaşan Gitea — her zaman sahibinin seçtiği bir adreste
çalışır: kendi sunucunuz ya da codeberg.org gibi herkese açık bir sunucu. Bu
adresi bir profile **Ayarlar → Entegrasyonlar → Forgejo** altında, bir erişim
token’ıyla birlikte verin. **Token oluştur**, o sunucunun token sayfasını açar.
Token’a *repository* üzerinde okuma ve yazma, *user* ve *organization* üzerinde
okuma izni verin.

Bundan sonra o sunucudaki uzak depolar Forgejo’dur:

| Çalışır | Nasıl |
|---------|-------|
| Push ve fetch | Profilin token’ıyla oturum açılarak |
| Açık pull request’ler | Kenar çubuğunda listelenir ve [pull request sayfasında](#i̇nceleme--github-ve-gitlab) açılır: konuşma, her dosyanın diff’i, kontroller (Forgejo Actions dahil commit durumları), yorum, onay, değişiklik isteme ve merge / squash / rebase |
| Pull request oluşturma | Uygulamadan; taslak, Forgejo’nun kullandığı `WIP:` önekini alır |
| Klon tarayıcısı, depo oluşturma | O sunucuda, hesabınız ya da bir organizasyon altında |

GitLab’da olduğu gibi, **bir Forgejo token’ı yalnızca onu veren sunucuya gider**.
Forgejo adresi olmayan bir profilin hiçbir Forgejo kimlik bilgisi yoktur. Geri
düşülecek varsayılan bir sunucu yoktur.

Sınırlar:

- Satır yorumu dizileri gösterilir ama uygulamadan yanıtlanamaz: Forgejo’nun var
  olan bir dizinin içine yanıt için API’si yoktur. Sunucuda yanıtlayın.
- Yalnızca https, profil başına bir Forgejo sunucusu.
- Listeler yirmi istekten sonra durur: sunucunun varsayılan sayfa boyutunda 1.000 pull request veya depo.

## Issue'lar, kilometre taşları, sürümler — GitHub

Issue'lara göz atın ve tam bir issue sekmesi açın: gövde, yorumlar, etiketler,
atananlar, kilometre taşı, Projects v2 alanları, kapatma/yeniden açma ve **bu
issue için bir dal oluşturma** (yapay zekâ adlandırmasıyla). Kilometre taşları
ilerlemelerini ve issue'larını gösterir. Sürümlere bir changelog sayfasıyla
göz atılabilir.

## İncelemenizi bekleyenler

Kenar çubuğundaki pull request listesinde 👁, **sizin** inceleyici olduğunuz ve
henüz yanıt vermediğiniz PR’ları işaretler — GitHub, GitLab ve Forgejo’da aynı
şekilde. “Siz”in kim olduğu, profilin kimlik bilgisiyle sunucuya sorulur ve on
dakika hatırlanır. Kendi kullanıcısını okuyamayan bir token (örneğin Forgejo’da
`read:user` olmadan) hiçbir şeyi işaretlemez.

## Bildirimler — GitHub

Bütün gelen kutunuz — inceleme istekleri, bahsedilmeler, CI etkinliği — her
depoyu kapsayacak şekilde, okunmamış/tümü filtreleri ve okundu olarak işaretleme
ile birlikte. Araç çubuğundaki zil okunmamış rozetini taşır ve bir inceleme
istendiğinde ya da CI bittiğinde isteğe bağlı masaüstü bildirimleri düşer.

## Token'lar

Birden çok hesap veya kuruluş için profil başına token'lar, işletim sisteminizin
anahtar zincirinde saklanır. Gitcito ayrıca **git credential helper**'ınızın
zaten tuttuğu bilgileri ödünç alabilir; böylece hâlihazırda kimlik
doğruladığınız bir kuruluş çoğu zaman hiçbir kuruluma ihtiyaç duymaz.
[Güvenlik ve sırlar](security.md) sayfasına bakın.

Her profil **kendi hesabını bağlar**. Ayarlar → Entegrasyonlar'da **git ile
oturum aç**, makinede zaten bulunan bir oturumu arar — git'in credential
helper'ı, ardından **GitHub CLI**'ın etkin hesabı, ardından helper'ın kendi
oturum açma penceresi — ve o hesabı profile bağlar. Hiçbir şey örtük olarak
paylaşılmaz: yeni bir profil bağlantısız başlar ve başka bir profilin zaten
bağladığı hesap reddedilir. İkinci bir GitHub hesabı bağlamak için onu gh'ye
ekleyin (`gh auth login`), etkin yapın (`gh auth switch`) ve diğer profilden
oturum açın — ya da o hesabın belirtecini yapıştırın. git hiçbir zaman bir
terminalde kullanıcı adı ve parola sormaz.

Sayfa, bağlantının profilin belirteci mi, git helper'ına mı yoksa GitHub CLI'a mı
bağlı olduğunu gösterir; **Bağlantıyı kes** bunu yalnızca bu profil için geri
alır: belirteç silinir (siz orada iptal edene kadar sağlayıcıda geçerli kalır),
bağlantı kaldırılır (oturum gh'de ya da helper'da kalır).

Sağlayıcının API'si — pull request'ler, issue'lar, CI — ve git'in https üzerinden
kendi fetch, pull ve push işlemleri, profilin belirtecini ya da bağlı hesabını
kullanır. Kimlik bilgisi git'e yalnızca o komut için, uzak deponun ana
makinesiyle sınırlı olarak ulaşır ve asla `.git/config` dosyasına yazılmaz. İkisi
de olmayan bir profil, git'i kendi credential helper'ına bırakır. Azure DevOps,
GitLab ve Bitbucket git'in credential helper'ı üzerinden bağlanır — Git
Credential Manager sağlayıcı başına birden fazla hesap tutar — ya da profil
başına bir belirteç kullanır. Bir bağlantı sağlayıcı başına tek bir hesabı
adlandırır; farklı hesaplar gerektiren kuruluşlar her biri için ayrı bir profil
ister.

**Ayrıca bakınız:** [Yığılmış dallar](stacks.md) · [Yapay zekâ özellikleri](ai.md)
