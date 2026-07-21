import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

try {
  process.loadEnvFile();
} catch {
  // .env ausente (p. ej. en CI con variables ya inyectadas) — se ignora.
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await db.payment.deleteMany();
  await db.orderItem.deleteMany();
  await db.orderShipping.deleteMany();
  await db.order.deleteMany();
  await db.productImage.deleteMany();
  await db.product.deleteMany();
  await db.brand.deleteMany();
  await db.category.deleteMany();
  await db.user.deleteMany();

  // Brands
  const brands = await Promise.all([
    db.brand.create({ data: { id: "b-asrock", name: "ASRock", slug: "asrock" } }),
    db.brand.create({ data: { id: "b-corsair", name: "Corsair", slug: "corsair" } }),
    db.brand.create({ data: { id: "b-biwin", name: "Biwin", slug: "biwin" } }),
    db.brand.create({ data: { id: "b-creative", name: "Creative", slug: "creative" } }),
    db.brand.create({ data: { id: "b-gskill", name: "G.Skill", slug: "gskill" } }),
    db.brand.create({ data: { id: "b-inno3d", name: "INNO3D", slug: "inno3d" } }),
    db.brand.create({ data: { id: "b-kingston", name: "Kingston Fury", slug: "kingston-fury" } }),
    db.brand.create({ data: { id: "b-tforce", name: "T-Force", slug: "t-force" } }),
    db.brand.create({ data: { id: "b-amd", name: "AMD", slug: "amd" } }),
    db.brand.create({ data: { id: "b-arctic", name: "Arctic", slug: "arctic" } }),
    db.brand.create({ data: { id: "b-puskill", name: "Puskill", slug: "puskill" } }),
    db.brand.create({ data: { id: "b-msi", name: "MSI", slug: "msi" } }),
    db.brand.create({ data: { id: "b-asus", name: "ASUS", slug: "asus" } }),
    db.brand.create({ data: { id: "b-palit", name: "Palit", slug: "palit" } }),
    db.brand.create({ data: { id: "b-antec", name: "Antec", slug: "antec" } }),
    db.brand.create({ data: { id: "b-intel", name: "Intel", slug: "intel" } }),
    db.brand.create({ data: { id: "b-gigabyte", name: "Gigabyte", slug: "gigabyte" } }),
    db.brand.create({ data: { id: "b-zotac", name: "Zotac", slug: "zotac" } }),
    db.brand.create({ data: { id: "b-sapphire", name: "Sapphire", slug: "sapphire" } }),
    db.brand.create({ data: { id: "b-powercolor", name: "PowerColor", slug: "powercolor" } }),
    db.brand.create({ data: { id: "b-samsung", name: "Samsung", slug: "samsung" } }),
    db.brand.create({ data: { id: "b-wd", name: "Western Digital", slug: "western-digital" } }),
    db.brand.create({ data: { id: "b-seagate", name: "Seagate", slug: "seagate" } }),
    db.brand.create({ data: { id: "b-adata", name: "ADATA", slug: "adata" } }),
    db.brand.create({ data: { id: "b-cougar", name: "Cougar", slug: "cougar" } }),
    db.brand.create({ data: { id: "b-coolermaster", name: "Cooler Master", slug: "cooler-master" } }),
    db.brand.create({ data: { id: "b-nzxt", name: "NZXT", slug: "nzxt" } }),
    db.brand.create({ data: { id: "b-thermaltake", name: "Thermaltake", slug: "thermaltake" } }),
    db.brand.create({ data: { id: "b-deepcool", name: "Deepcool", slug: "deepcool" } }),
    db.brand.create({ data: { id: "b-fractal", name: "Fractal Design", slug: "fractal-design" } }),
    db.brand.create({ data: { id: "b-evga", name: "EVGA", slug: "evga" } }),
    db.brand.create({ data: { id: "b-logitech", name: "Logitech", slug: "logitech" } }),
    db.brand.create({ data: { id: "b-razer", name: "Razer", slug: "razer" } }),
    db.brand.create({ data: { id: "b-hyperx", name: "HyperX", slug: "hyperx" } }),
    db.brand.create({ data: { id: "b-steelseries", name: "SteelSeries", slug: "steelseries" } }),
    db.brand.create({ data: { id: "b-redragon", name: "Redragon", slug: "redragon" } }),
    db.brand.create({ data: { id: "b-benq", name: "BenQ", slug: "benq" } }),
    db.brand.create({ data: { id: "b-lg", name: "LG", slug: "lg" } }),
    db.brand.create({ data: { id: "b-aoc", name: "AOC", slug: "aoc" } }),
    db.brand.create({ data: { id: "b-viewsonic", name: "ViewSonic", slug: "viewsonic" } }),
    db.brand.create({ data: { id: "b-lenovo", name: "Lenovo", slug: "lenovo" } }),
    db.brand.create({ data: { id: "b-hp", name: "HP", slug: "hp" } }),
    db.brand.create({ data: { id: "b-dell", name: "Dell", slug: "dell" } }),
    db.brand.create({ data: { id: "b-acer", name: "Acer", slug: "acer" } }),
    db.brand.create({ data: { id: "b-apple", name: "Apple", slug: "apple" } }),
    db.brand.create({ data: { id: "b-jbl", name: "JBL", slug: "jbl" } }),
    db.brand.create({ data: { id: "b-elgato", name: "Elgato", slug: "elgato" } }),
  ]);
  console.log(`  ${brands.length} brands`);

  // Categories (parents first, then children to avoid FK issues)
  const topCategories = await Promise.all([
    db.category.create({ data: { id: "c-componentes", name: "Componentes PC", slug: "componentes" } }),
    db.category.create({ data: { id: "c-configuraciones", name: "PC Configuraciones", slug: "pc-configuraciones" } }),
    db.category.create({ data: { id: "c-monitores", name: "Monitores", slug: "monitores" } }),
    db.category.create({ data: { id: "c-perifericos", name: "Periféricos PC", slug: "perifericos" } }),
    db.category.create({ data: { id: "c-laptops", name: "Laptops", slug: "laptops" } }),
    db.category.create({ data: { id: "c-streaming", name: "Streaming", slug: "streaming" } }),
    db.category.create({ data: { id: "c-apple", name: "Apple", slug: "apple" } }),
  ]);
  const subCategories = await Promise.all([
    db.category.create({ data: { id: "c-procesadores", name: "Procesadores", slug: "procesadores", parentId: "c-componentes" } }),
    db.category.create({ data: { id: "c-tarjetas-video", name: "Tarjetas de Video", slug: "tarjetas-video", parentId: "c-componentes" } }),
    db.category.create({ data: { id: "c-memorias", name: "Memorias RAM", slug: "memorias-ram", parentId: "c-componentes" } }),
    db.category.create({ data: { id: "c-almacenamiento", name: "Almacenamiento", slug: "almacenamiento", parentId: "c-componentes" } }),
    db.category.create({ data: { id: "c-placas", name: "Placas Madre", slug: "placas-madre", parentId: "c-componentes" } }),
    db.category.create({ data: { id: "c-fuentes", name: "Fuentes de Poder", slug: "fuentes-poder", parentId: "c-componentes" } }),
    db.category.create({ data: { id: "c-refrigeracion", name: "Refrigeración", slug: "refrigeracion", parentId: "c-componentes" } }),
    db.category.create({ data: { id: "c-gabinetes", name: "Gabinetes", slug: "gabinetes", parentId: "c-componentes" } }),
  ]);
  console.log(`  ${topCategories.length + subCategories.length} categories`);

  // Products
  const productsData = [
    { id: "p-1", sku: "PN:CMK16GX5M1E6000Z36", name: "Memoria 16GB DDR5 Corsair Vengeance Black Intel XMP/AMD EXPO Bus 6000MHz", slug: "memoria-16gb-ddr5-corsair-vengeance-6000", brandId: "b-corsair", categoryId: "c-memorias", priceUSD: 246.5, stock: 24, isNew: true, featured: true, description: "Memoria de alto rendimiento DDR5 con perfiles XMP 3.0 y AMD EXPO, ideal para gaming y productividad.", specs: [{ label: "Capacidad", value: "16 GB" }, { label: "Tipo", value: "DDR5" }, { label: "Frecuencia", value: "6000 MHz" }, { label: "Latencia", value: "CL36" }] },
    { id: "p-2", sku: "PN:KF564C32BBEA-16", name: "Memoria 16GB DDR5 Kingston Fury Beast Black RGB XMP/AMD EXPO Bus 6400MHz", slug: "memoria-16gb-ddr5-kingston-fury-beast-6400", brandId: "b-kingston", categoryId: "c-memorias", priceUSD: 286, stock: 21, isNew: true, featured: true, specs: [{ label: "Capacidad", value: "16 GB" }, { label: "Tipo", value: "DDR5 RGB" }, { label: "Frecuencia", value: "6400 MHz" }] },
    { id: "p-3", sku: "PN:TLTYD48G3200HC16CBK", name: "Memoria 8GB DDR4 T-Force Vulcan TUF Gaming Alliance Intel XMP Bus 3200MHz", slug: "memoria-8gb-ddr4-tforce-vulcan-3200", brandId: "b-tforce", categoryId: "c-memorias", priceUSD: 86, stock: 30, isNew: true, featured: true, specs: [{ label: "Capacidad", value: "8 GB" }, { label: "Tipo", value: "DDR4" }, { label: "Frecuencia", value: "3200 MHz" }] },
    { id: "p-4", sku: "PN:YD3200C5FHBOX", name: "Procesador AMD Ryzen 3 3200G 3.60GHz hasta 4.00GHz 6MB 4 Core AM4", slug: "procesador-amd-ryzen-3-3200g", brandId: "b-amd", categoryId: "c-procesadores", priceUSD: 83.21, stock: 40, isNew: true, featured: true, specs: [{ label: "Núcleos", value: "4" }, { label: "Frecuencia", value: "3.6 - 4.0 GHz" }, { label: "Socket", value: "AM4" }, { label: "Gráficos", value: "Radeon Vega 8" }] },
    { id: "p-5", sku: "PN:ACTCP00092A", name: "Pasta Térmica Arctic MX-7 4Grs + 6Pcs MX Cleaner", slug: "pasta-termica-arctic-mx-7", brandId: "b-arctic", categoryId: "c-refrigeracion", priceUSD: 14, stock: 60, isNew: true, featured: true, specs: [{ label: "Contenido", value: "4 g" }, { label: "Conductividad", value: "Alta" }] },
    { id: "p-6", sku: "PN:PSK-D4D19M2666B-16G", name: "Memoria 16GB DDR4 Puskill Killblade Bus 2666MHz", slug: "memoria-16gb-ddr4-puskill-killblade-2666", brandId: "b-puskill", categoryId: "c-memorias", priceUSD: 99.99, stock: 18, isNew: true, featured: true, specs: [{ label: "Capacidad", value: "16 GB" }, { label: "Tipo", value: "DDR4" }, { label: "Frecuencia", value: "2666 MHz" }] },
    { id: "p-7", sku: "PN:RTX5070-VENTUS3X", name: "Tarjeta de Video MSI GeForce RTX 5070 Ventus 3X 12GB GDDR7", slug: "msi-rtx-5070-ventus-3x-12gb", brandId: "b-msi", categoryId: "c-tarjetas-video", priceUSD: 649, stock: 8, isNew: true, featured: true, specs: [{ label: "GPU", value: "GeForce RTX 5070" }, { label: "Memoria", value: "12 GB GDDR7" }, { label: "Salidas", value: "3x DP, 1x HDMI" }] },
    { id: "p-8", sku: "PN:INNO-RTX5070TI", name: "Tarjeta de Video INNO3D GeForce RTX 5070 Ti Twin X2 16GB GDDR7", slug: "inno3d-rtx-5070-ti-twin-x2-16gb", brandId: "b-inno3d", categoryId: "c-tarjetas-video", priceUSD: 879, stock: 0, onRequest: true, isNew: true, featured: true, specs: [{ label: "GPU", value: "GeForce RTX 5070 Ti" }, { label: "Memoria", value: "16 GB GDDR7" }] },
    { id: "p-9", sku: "PN:INNO-RTX5060", name: "Tarjeta de Video INNO3D GeForce RTX 5060 Twin X2 8GB GDDR7", slug: "inno3d-rtx-5060-twin-x2-8gb", brandId: "b-inno3d", categoryId: "c-tarjetas-video", priceUSD: 329, stock: 12, isNew: true, featured: true, specs: [{ label: "GPU", value: "GeForce RTX 5060" }, { label: "Memoria", value: "8 GB GDDR7" }] },
    { id: "p-10", sku: "PN:PALIT-RTX5050", name: "Tarjeta de Video Palit GeForce RTX 5050 Dual 8GB GDDR6", slug: "palit-rtx-5050-dual-8gb", brandId: "b-palit", categoryId: "c-tarjetas-video", priceUSD: 279, stock: 15, isNew: true, featured: true, specs: [{ label: "GPU", value: "GeForce RTX 5050" }, { label: "Memoria", value: "8 GB GDDR6" }] },
    { id: "p-11", sku: "PN:ASUS-RTX5060TI-DUAL", name: "Tarjeta de Video ASUS Dual GeForce RTX 5060 Ti OC 16GB GDDR7", slug: "asus-dual-rtx-5060-ti-oc-16gb", brandId: "b-asus", categoryId: "c-tarjetas-video", priceUSD: 499, stock: 6, isNew: true, featured: true, specs: [{ label: "GPU", value: "GeForce RTX 5060 Ti" }, { label: "Memoria", value: "16 GB GDDR7" }] },
    { id: "p-12", sku: "PN:SHARKOON-REBELP15-850", name: "Fuente de Poder Sharkoon Rebel P15 850W 80+ Gold ATX 3.1 Full Modular", slug: "fuente-sharkoon-rebel-p15-850w", brandId: "b-antec", categoryId: "c-fuentes", priceUSD: 139.9, stock: 20, featured: true, description: "Fuente full modular con certificación Cybenetics Gold, ventilador híbrido silencioso y protección contra sobrecargas y sobretensiones. Compatible ATX 3.1 con cable 12V-2x6 (600W).", specs: [{ label: "Potencia", value: "850 W" }, { label: "Certificación", value: "Cybenetics Gold" }, { label: "Estándar", value: "ATX 3.1" }, { label: "Conector", value: "12V-2x6 (600W)" }] },
    { id: "p-13", sku: "PN:ASROCK-B650M", name: "Placa Madre ASRock B650M PG Lightning WiFi AM5 mATX DDR5", slug: "asrock-b650m-pg-lightning-wifi", brandId: "b-asrock", categoryId: "c-placas", priceUSD: 169, stock: 14, specs: [{ label: "Socket", value: "AM5" }, { label: "Formato", value: "Micro-ATX" }, { label: "Memoria", value: "DDR5" }] },
    { id: "p-14", sku: "PN:BIWIN-NV7400-1TB", name: "SSD Biwin NV7400 1TB M.2 NVMe PCIe 4.0", slug: "ssd-biwin-nv7400-1tb-nvme", brandId: "b-biwin", categoryId: "c-almacenamiento", priceUSD: 74.9, stock: 35, specs: [{ label: "Capacidad", value: "1 TB" }, { label: "Interfaz", value: "PCIe 4.0 NVMe" }, { label: "Lectura", value: "7400 MB/s" }] },
    { id: "p-15", sku: "PN:GSKILL-TZ-32GB", name: "Memoria 32GB (2x16) DDR5 G.Skill Trident Z5 RGB Bus 6400MHz", slug: "gskill-trident-z5-rgb-32gb-6400", brandId: "b-gskill", categoryId: "c-memorias", priceUSD: 189, stock: 17, specs: [{ label: "Capacidad", value: "32 GB (2x16)" }, { label: "Tipo", value: "DDR5 RGB" }, { label: "Frecuencia", value: "6400 MHz" }] },
    { id: "p-16", sku: "PN:MSI-MAG274QRF", name: 'Monitor MSI MAG 274QRF QD 27" 2K 180Hz IPS Gaming', slug: "monitor-msi-mag-274qrf-27-2k-180hz", brandId: "b-msi", categoryId: "c-monitores", priceUSD: 329, stock: 9, featured: true, specs: [{ label: "Tamaño", value: '27"' }, { label: "Resolución", value: "2560x1440 (2K)" }, { label: "Refresco", value: "180 Hz" }, { label: "Panel", value: "IPS Quantum Dot" }] },
    { id: "p-17", sku: "PN:CORSAIR-K70-RGB", name: "Teclado Mecánico Corsair K70 RGB PRO Switch Cherry MX Red", slug: "teclado-corsair-k70-rgb-pro", brandId: "b-corsair", categoryId: "c-perifericos", priceUSD: 159, stock: 22, featured: true, specs: [{ label: "Tipo", value: "Mecánico" }, { label: "Switch", value: "Cherry MX Red" }, { label: "Iluminación", value: "RGB per-key" }] },
    { id: "p-18", sku: "PN:CREATIVE-GIGAWORKS", name: "Parlantes Creative GigaWorks T20 Series II 2.0", slug: "parlantes-creative-gigaworks-t20", brandId: "b-creative", categoryId: "c-streaming", priceUSD: 99, stock: 13, specs: [{ label: "Configuración", value: "2.0" }, { label: "Conexión", value: "3.5 mm" }] },
    { id: "p-1000", sku: "PN:BX8071514100F", name: "Intel Core i3-14100F 3.50GHz hasta 4.70GHz 12MB 4 Núcleos LGA1700", slug: "intel-core-i3-14100f-3-50ghz-hasta-4-70ghz-12mb-4-nucleos-lga1700", brandId: "b-intel", categoryId: "c-procesadores", priceUSD: 109, stock: 22, specs: [{ label: "Núcleos", value: "4" }, { label: "Frecuencia", value: "3.5 - 4.7 GHz" }, { label: "Socket", value: "LGA1700" }, { label: "Caché", value: "12 MB" }] },
    { id: "p-1001", sku: "PN:BX8071514400F", name: "Intel Core i5-14400F 2.50GHz hasta 4.70GHz 20MB 10 Núcleos LGA1700", slug: "intel-core-i5-14400f-2-50ghz-hasta-4-70ghz-20mb-10-nucleos-lga1700", brandId: "b-intel", categoryId: "c-procesadores", priceUSD: 179, stock: 30, specs: [{ label: "Núcleos", value: "10" }, { label: "Frecuencia", value: "2.5 - 4.7 GHz" }, { label: "Socket", value: "LGA1700" }, { label: "Caché", value: "20 MB" }] },
    { id: "p-1002", sku: "PN:BX8071514600KF", name: "Intel Core i5-14600KF 3.50GHz hasta 5.30GHz 24MB 14 Núcleos LGA1700", slug: "intel-core-i5-14600kf-3-50ghz-hasta-5-30ghz-24mb-14-nucleos-lga1700", brandId: "b-intel", categoryId: "c-procesadores", priceUSD: 289, stock: 16, featured: true, specs: [{ label: "Núcleos", value: "14" }, { label: "Frecuencia", value: "3.5 - 5.3 GHz" }, { label: "Socket", value: "LGA1700" }, { label: "Caché", value: "24 MB" }] },
    { id: "p-1003", sku: "PN:BX8071514700F", name: "Intel Core i7-14700F 2.10GHz hasta 5.40GHz 33MB 20 Núcleos LGA1700", slug: "intel-core-i7-14700f-2-10ghz-hasta-5-40ghz-33mb-20-nucleos-lga1700", brandId: "b-intel", categoryId: "c-procesadores", priceUSD: 359, stock: 12, specs: [{ label: "Núcleos", value: "20" }, { label: "Frecuencia", value: "2.1 - 5.4 GHz" }, { label: "Socket", value: "LGA1700" }, { label: "Caché", value: "33 MB" }] },
    { id: "p-1004", sku: "PN:BX8071514900KF", name: "Intel Core i9-14900KF 3.20GHz hasta 6.00GHz 36MB 24 Núcleos LGA1700", slug: "intel-core-i9-14900kf-3-20ghz-hasta-6-00ghz-36mb-24-nucleos-lga1700", brandId: "b-intel", categoryId: "c-procesadores", priceUSD: 589, stock: 5, featured: true, specs: [{ label: "Núcleos", value: "24" }, { label: "Frecuencia", value: "3.2 - 6.0 GHz" }, { label: "Socket", value: "LGA1700" }, { label: "Caché", value: "36 MB" }] },
    { id: "p-1005", sku: "PN:100-100000927BOX", name: "AMD Ryzen 5 5600 3.50GHz hasta 4.40GHz 32MB 6 Núcleos AM4", slug: "amd-ryzen-5-5600-3-50ghz-hasta-4-40ghz-32mb-6-nucleos-am4", brandId: "b-amd", categoryId: "c-procesadores", priceUSD: 129, stock: 28, specs: [{ label: "Núcleos", value: "6" }, { label: "Frecuencia", value: "3.5 - 4.4 GHz" }, { label: "Socket", value: "AM4" }, { label: "Caché", value: "32 MB" }] },
    { id: "p-1006", sku: "PN:100-100000593WOF", name: "AMD Ryzen 5 7600X 4.70GHz hasta 5.30GHz 32MB 6 Núcleos AM5", slug: "amd-ryzen-5-7600x-4-70ghz-hasta-5-30ghz-32mb-6-nucleos-am5", brandId: "b-amd", categoryId: "c-procesadores", priceUSD: 239, stock: 19, isNew: true, specs: [{ label: "Núcleos", value: "6" }, { label: "Frecuencia", value: "4.7 - 5.3 GHz" }, { label: "Socket", value: "AM5" }, { label: "Caché", value: "32 MB" }] },
    { id: "p-1007", sku: "PN:100-100000591WOF", name: "AMD Ryzen 7 7700X 4.50GHz hasta 5.40GHz 40MB 8 Núcleos AM5", slug: "amd-ryzen-7-7700x-4-50ghz-hasta-5-40ghz-40mb-8-nucleos-am5", brandId: "b-amd", categoryId: "c-procesadores", priceUSD: 319, stock: 14, isNew: true, specs: [{ label: "Núcleos", value: "8" }, { label: "Frecuencia", value: "4.5 - 5.4 GHz" }, { label: "Socket", value: "AM5" }, { label: "Caché", value: "40 MB" }] },
    { id: "p-1008", sku: "PN:100-100000589WOF", name: "AMD Ryzen 9 7900X 4.70GHz hasta 5.60GHz 76MB 12 Núcleos AM5", slug: "amd-ryzen-9-7900x-4-70ghz-hasta-5-60ghz-76mb-12-nucleos-am5", brandId: "b-amd", categoryId: "c-procesadores", priceUSD: 449, stock: 8, isNew: true, featured: true, specs: [{ label: "Núcleos", value: "12" }, { label: "Frecuencia", value: "4.7 - 5.6 GHz" }, { label: "Socket", value: "AM5" }, { label: "Caché", value: "76 MB" }] },
    { id: "p-1009", sku: "PN:100-100001277WOF", name: "AMD Ryzen 9 9950X3D 4.30GHz hasta 5.70GHz 144MB 16 Núcleos AM5", slug: "amd-ryzen-9-9950x3d-4-30ghz-hasta-5-70ghz-144mb-16-nucleos-am5", brandId: "b-amd", categoryId: "c-procesadores", priceUSD: 699, stock: 3, isNew: true, featured: true, specs: [{ label: "Núcleos", value: "16" }, { label: "Frecuencia", value: "4.3 - 5.7 GHz" }, { label: "Socket", value: "AM5" }, { label: "Caché", value: "144 MB" }] },
    { id: "p-1010", sku: "PN:GV-N4060WF2OC-8GD", name: "Tarjeta de Video Gigabyte GeForce RTX 4060 Windforce OC 8GB GDDR6", slug: "tarjeta-de-video-gigabyte-geforce-rtx-4060-windforce-oc-8gb-gddr6", brandId: "b-gigabyte", categoryId: "c-tarjetas-video", priceUSD: 299, stock: 14, specs: [{ label: "GPU", value: "GeForce RTX 4060" }, { label: "Memoria", value: "8 GB GDDR6" }] },
    { id: "p-1011", sku: "PN:ZT-D40610H-10M", name: "Tarjeta de Video Zotac Gaming GeForce RTX 4060 Ti Twin Edge 8GB GDDR6", slug: "tarjeta-de-video-zotac-gaming-geforce-rtx-4060-ti-twin-edge-8gb-gddr6", brandId: "b-zotac", categoryId: "c-tarjetas-video", priceUSD: 419, stock: 9, specs: [{ label: "GPU", value: "GeForce RTX 4060 Ti" }, { label: "Memoria", value: "8 GB GDDR6" }] },
    { id: "p-1012", sku: "PN:11324-01-20G", name: "Tarjeta de Video Sapphire Pulse Radeon RX 7600 8GB GDDR6", slug: "tarjeta-de-video-sapphire-pulse-radeon-rx-7600-8gb-gddr6", brandId: "b-sapphire", categoryId: "c-tarjetas-video", priceUSD: 269, stock: 11, specs: [{ label: "GPU", value: "Radeon RX 7600" }, { label: "Memoria", value: "8 GB GDDR6" }] },
    { id: "p-1013", sku: "PN:RX7700XT12GHH", name: "Tarjeta de Video PowerColor Hellhound Radeon RX 7700 XT 12GB GDDR6", slug: "tarjeta-de-video-powercolor-hellhound-radeon-rx-7700-xt-12gb-gddr6", brandId: "b-powercolor", categoryId: "c-tarjetas-video", priceUSD: 449, stock: 7, featured: true, specs: [{ label: "GPU", value: "Radeon RX 7700 XT" }, { label: "Memoria", value: "12 GB GDDR6" }] },
    { id: "p-1014", sku: "PN:TUF-RTX4070S-O12G", name: "Tarjeta de Video ASUS TUF Gaming GeForce RTX 4070 Super 12GB GDDR6X", slug: "tarjeta-de-video-asus-tuf-gaming-geforce-rtx-4070-super-12gb-gddr6x", brandId: "b-asus", categoryId: "c-tarjetas-video", priceUSD: 619, stock: 6, featured: true, specs: [{ label: "GPU", value: "GeForce RTX 4070 Super" }, { label: "Memoria", value: "12 GB GDDR6X" }] },
    { id: "p-1015", sku: "PN:RTX4080S-GXT-16G", name: "Tarjeta de Video MSI Gaming X Trio GeForce RTX 4080 Super 16GB GDDR6X", slug: "tarjeta-de-video-msi-gaming-x-trio-geforce-rtx-4080-super-16gb-gddr6x", brandId: "b-msi", categoryId: "c-tarjetas-video", priceUSD: 999, stock: 4, featured: true, specs: [{ label: "GPU", value: "GeForce RTX 4080 Super" }, { label: "Memoria", value: "16 GB GDDR6X" }] },
    { id: "p-1016", sku: "PN:C406T-08D6X-1810VA26", name: "Tarjeta de Video INNO3D GeForce RTX 4060 iChill X3 8GB GDDR6", slug: "tarjeta-de-video-inno3d-geforce-rtx-4060-ichill-x3-8gb-gddr6", brandId: "b-inno3d", categoryId: "c-tarjetas-video", priceUSD: 309, stock: 13, specs: [{ label: "GPU", value: "GeForce RTX 4060" }, { label: "Memoria", value: "8 GB GDDR6" }] },
    { id: "p-1017", sku: "PN:NE64070019T1-1043D", name: "Tarjeta de Video Palit GeForce RTX 4070 Dual 12GB GDDR6X", slug: "tarjeta-de-video-palit-geforce-rtx-4070-dual-12gb-gddr6x", brandId: "b-palit", categoryId: "c-tarjetas-video", priceUSD: 539, stock: 8, specs: [{ label: "GPU", value: "GeForce RTX 4070" }, { label: "Memoria", value: "12 GB GDDR6X" }] },
    { id: "p-1018", sku: "PN:GV-R66EAGLE-8GD", name: "Tarjeta de Video Gigabyte Radeon RX 6600 Eagle 8GB GDDR6", slug: "tarjeta-de-video-gigabyte-radeon-rx-6600-eagle-8gb-gddr6", brandId: "b-gigabyte", categoryId: "c-tarjetas-video", priceUSD: 219, stock: 17, specs: [{ label: "GPU", value: "Radeon RX 6600" }, { label: "Memoria", value: "8 GB GDDR6" }] },
    { id: "p-1019", sku: "PN:ROG-STRIX-RTX5090-O32G", name: "Tarjeta de Video ASUS ROG Strix GeForce RTX 5090 32GB GDDR7", slug: "tarjeta-de-video-asus-rog-strix-geforce-rtx-5090-32gb-gddr7", brandId: "b-asus", categoryId: "c-tarjetas-video", priceUSD: 2199, stock: 0, onRequest: true, isNew: true, featured: true, specs: [{ label: "GPU", value: "GeForce RTX 5090" }, { label: "Memoria", value: "32 GB GDDR7" }] },
    { id: "p-1020", sku: "PN:KF432C16BB-8", name: "Memoria 8GB DDR4 Kingston Fury Beast Bus 3200MHz", slug: "memoria-8gb-ddr4-kingston-fury-beast-bus-3200mhz", brandId: "b-kingston", categoryId: "c-memorias", priceUSD: 39.9, stock: 45, specs: [{ label: "Capacidad", value: "8 GB" }, { label: "Tipo", value: "DDR4" }, { label: "Frecuencia", value: "3200 MHz" }] },
    { id: "p-1021", sku: "PN:CMK32GX4M2D3600C18", name: "Memoria 32GB (2x16) DDR4 Corsair Vengeance LPX Bus 3600MHz", slug: "memoria-32gb-2x16-ddr4-corsair-vengeance-lpx-bus-3600mhz", brandId: "b-corsair", categoryId: "c-memorias", priceUSD: 119, stock: 20, specs: [{ label: "Capacidad", value: "32 GB (2x16)" }, { label: "Tipo", value: "DDR4" }, { label: "Frecuencia", value: "3600 MHz" }] },
    { id: "p-1022", sku: "PN:TF10D516G6000HC38", name: "Memoria 16GB DDR5 T-Force Delta RGB Bus 6000MHz", slug: "memoria-16gb-ddr5-t-force-delta-rgb-bus-6000mhz", brandId: "b-tforce", categoryId: "c-memorias", priceUSD: 109, stock: 24, specs: [{ label: "Capacidad", value: "16 GB" }, { label: "Tipo", value: "DDR5 RGB" }, { label: "Frecuencia", value: "6000 MHz" }] },
    { id: "p-1023", sku: "PN:KF572C38RBAK2-32", name: "Memoria 32GB (2x16) DDR5 Kingston Fury Renegade RGB Bus 7200MHz", slug: "memoria-32gb-2x16-ddr5-kingston-fury-renegade-rgb-bus-7200mhz", brandId: "b-kingston", categoryId: "c-memorias", priceUSD: 219, stock: 10, featured: true, specs: [{ label: "Capacidad", value: "32 GB (2x16)" }, { label: "Tipo", value: "DDR5 RGB" }, { label: "Frecuencia", value: "7200 MHz" }] },
    { id: "p-1024", sku: "PN:CMT64GX5M2B6000C30", name: "Memoria 64GB (2x32) DDR5 Corsair Dominator Platinum RGB Bus 6000MHz", slug: "memoria-64gb-2x32-ddr5-corsair-dominator-platinum-rgb-bus-6000mhz", brandId: "b-corsair", categoryId: "c-memorias", priceUSD: 389, stock: 6, featured: true, specs: [{ label: "Capacidad", value: "64 GB (2x32)" }, { label: "Tipo", value: "DDR5 RGB" }, { label: "Frecuencia", value: "6000 MHz" }] },
    { id: "p-1025", sku: "PN:PSK-D3D18M1600B-8G", name: "Memoria 8GB DDR3 Puskill Killblade Bus 1600MHz", slug: "memoria-8gb-ddr3-puskill-killblade-bus-1600mhz", brandId: "b-puskill", categoryId: "c-memorias", priceUSD: 24.9, stock: 25, specs: [{ label: "Capacidad", value: "8 GB" }, { label: "Tipo", value: "DDR3" }, { label: "Frecuencia", value: "1600 MHz" }] },
    { id: "p-1026", sku: "PN:F4-3200C16D-16GVK", name: "Memoria 16GB (2x8) DDR4 G.Skill Ripjaws V Bus 3200MHz", slug: "memoria-16gb-2x8-ddr4-g-skill-ripjaws-v-bus-3200mhz", brandId: "b-gskill", categoryId: "c-memorias", priceUSD: 69.9, stock: 32, specs: [{ label: "Capacidad", value: "16 GB (2x8)" }, { label: "Tipo", value: "DDR4" }, { label: "Frecuencia", value: "3200 MHz" }] },
    { id: "p-1027", sku: "PN:AX5U6000C3016G-DCLARBK", name: "Memoria 32GB (2x16) DDR5 ADATA XPG Lancer RGB Bus 6000MHz", slug: "memoria-32gb-2x16-ddr5-adata-xpg-lancer-rgb-bus-6000mhz", brandId: "b-adata", categoryId: "c-memorias", priceUSD: 149, stock: 15, isNew: true, specs: [{ label: "Capacidad", value: "32 GB (2x16)" }, { label: "Tipo", value: "DDR5 RGB" }, { label: "Frecuencia", value: "6000 MHz" }] },
    { id: "p-1028", sku: "PN:MZ-V7S500BW", name: "SSD Samsung 970 EVO Plus 500GB M.2 NVMe PCIe 3.0", slug: "ssd-samsung-970-evo-plus-500gb-m-2-nvme-pcie-3-0", brandId: "b-samsung", categoryId: "c-almacenamiento", priceUSD: 44.9, stock: 40, specs: [{ label: "Capacidad", value: "500 GB" }, { label: "Interfaz", value: "PCIe 3.0 NVMe" }, { label: "Lectura", value: "3500 MB/s" }] },
    { id: "p-1029", sku: "PN:MZ-V9P2T0BW", name: "SSD Samsung 990 PRO 2TB M.2 NVMe PCIe 4.0", slug: "ssd-samsung-990-pro-2tb-m-2-nvme-pcie-4-0", brandId: "b-samsung", categoryId: "c-almacenamiento", priceUSD: 159, stock: 18, featured: true, specs: [{ label: "Capacidad", value: "2 TB" }, { label: "Interfaz", value: "PCIe 4.0 NVMe" }, { label: "Lectura", value: "7450 MB/s" }] },
    { id: "p-1030", sku: "PN:SNV3S/1000G", name: "SSD Kingston NV3 1TB M.2 NVMe PCIe 4.0", slug: "ssd-kingston-nv3-1tb-m-2-nvme-pcie-4-0", brandId: "b-kingston", categoryId: "c-almacenamiento", priceUSD: 54.9, stock: 50, specs: [{ label: "Capacidad", value: "1 TB" }, { label: "Interfaz", value: "PCIe 4.0 NVMe" }, { label: "Lectura", value: "6000 MB/s" }] },
    { id: "p-1031", sku: "PN:WDS100T2X0E", name: "SSD WD Black SN850X 1TB M.2 NVMe PCIe 4.0 Gaming", slug: "ssd-wd-black-sn850x-1tb-m-2-nvme-pcie-4-0-gaming", brandId: "b-wd", categoryId: "c-almacenamiento", priceUSD: 89.9, stock: 22, featured: true, specs: [{ label: "Capacidad", value: "1 TB" }, { label: "Interfaz", value: "PCIe 4.0 NVMe" }, { label: "Lectura", value: "7300 MB/s" }] },
    { id: "p-1032", sku: "PN:ALEG-800-500GCS", name: "SSD Adata Legend 800 500GB M.2 NVMe PCIe 4.0", slug: "ssd-adata-legend-800-500gb-m-2-nvme-pcie-4-0", brandId: "b-adata", categoryId: "c-almacenamiento", priceUSD: 39.9, stock: 35, specs: [{ label: "Capacidad", value: "500 GB" }, { label: "Interfaz", value: "PCIe 4.0 NVMe" }, { label: "Lectura", value: "3500 MB/s" }] },
    { id: "p-1033", sku: "PN:SA400S37/480G", name: "SSD Kingston A400 480GB SATA III 2.5\"", slug: "ssd-kingston-a400-480gb-sata-iii-2-5", brandId: "b-kingston", categoryId: "c-almacenamiento", priceUSD: 24.9, stock: 60, specs: [{ label: "Capacidad", value: "480 GB" }, { label: "Interfaz", value: "SATA III" }, { label: "Lectura", value: "500 MB/s" }] },
    { id: "p-1034", sku: "PN:MZ-77E1T0BW", name: "SSD Samsung 870 EVO 1TB SATA III 2.5\"", slug: "ssd-samsung-870-evo-1tb-sata-iii-2-5", brandId: "b-samsung", categoryId: "c-almacenamiento", priceUSD: 64.9, stock: 28, specs: [{ label: "Capacidad", value: "1 TB" }, { label: "Interfaz", value: "SATA III" }, { label: "Lectura", value: "560 MB/s" }] },
    { id: "p-1035", sku: "PN:ST2000DM008", name: "Disco Duro Seagate Barracuda 2TB SATA III 3.5\" 7200RPM", slug: "disco-duro-seagate-barracuda-2tb-sata-iii-3-5-7200rpm", brandId: "b-seagate", categoryId: "c-almacenamiento", priceUSD: 54.9, stock: 24, specs: [{ label: "Capacidad", value: "2 TB" }, { label: "Interfaz", value: "SATA III" }, { label: "Velocidad", value: "7200 RPM" }] },
    { id: "p-1036", sku: "PN:WD40EZAX", name: "Disco Duro WD Blue 4TB SATA III 3.5\" 5400RPM", slug: "disco-duro-wd-blue-4tb-sata-iii-3-5-5400rpm", brandId: "b-wd", categoryId: "c-almacenamiento", priceUSD: 89.9, stock: 16, specs: [{ label: "Capacidad", value: "4 TB" }, { label: "Interfaz", value: "SATA III" }, { label: "Velocidad", value: "5400 RPM" }] },
    { id: "p-1037", sku: "PN:ST4000VX016", name: "Disco Duro Seagate Skyhawk 4TB Videovigilancia SATA III 3.5\"", slug: "disco-duro-seagate-skyhawk-4tb-videovigilancia-sata-iii-3-5", brandId: "b-seagate", categoryId: "c-almacenamiento", priceUSD: 109, stock: 12, specs: [{ label: "Capacidad", value: "4 TB" }, { label: "Uso", value: "Videovigilancia" }, { label: "Velocidad", value: "5900 RPM" }] },
    { id: "p-1038", sku: "PN:BIWIN-NV7400-2TB", name: "SSD Biwin NV7400 2TB M.2 NVMe PCIe 4.0", slug: "ssd-biwin-nv7400-2tb-m-2-nvme-pcie-4-0", brandId: "b-biwin", categoryId: "c-almacenamiento", priceUSD: 139, stock: 20, isNew: true, specs: [{ label: "Capacidad", value: "2 TB" }, { label: "Interfaz", value: "PCIe 4.0 NVMe" }, { label: "Lectura", value: "7400 MB/s" }] },
    { id: "p-1039", sku: "PN:MU-PC1T0T/AM", name: "SSD Externo Samsung T7 1TB USB 3.2 Portátil", slug: "ssd-externo-samsung-t7-1tb-usb-3-2-portatil", brandId: "b-samsung", categoryId: "c-almacenamiento", priceUSD: 89.9, stock: 26, isNew: true, specs: [{ label: "Capacidad", value: "1 TB" }, { label: "Interfaz", value: "USB 3.2 Gen2" }, { label: "Lectura", value: "1050 MB/s" }] },
    { id: "p-1040", sku: "PN:PRIME-B760M-A-WIFI", name: "Placa Madre ASUS Prime B760M-A WiFi LGA1700 mATX DDR5", slug: "placa-madre-asus-prime-b760m-a-wifi-lga1700-matx-ddr5", brandId: "b-asus", categoryId: "c-placas", priceUSD: 159, stock: 16, specs: [{ label: "Socket", value: "LGA1700" }, { label: "Formato", value: "Micro-ATX" }, { label: "Memoria", value: "DDR5" }] },
    { id: "p-1041", sku: "PN:B650-GAMING-X-AX", name: "Placa Madre Gigabyte B650 Gaming X AX AM5 ATX DDR5", slug: "placa-madre-gigabyte-b650-gaming-x-ax-am5-atx-ddr5", brandId: "b-gigabyte", categoryId: "c-placas", priceUSD: 199, stock: 12, featured: true, specs: [{ label: "Socket", value: "AM5" }, { label: "Formato", value: "ATX" }, { label: "Memoria", value: "DDR5" }] },
    { id: "p-1042", sku: "PN:PRO-B550M-VC-WIFI", name: "Placa Madre MSI PRO B550M-VC WiFi AM4 mATX DDR4", slug: "placa-madre-msi-pro-b550m-vc-wifi-am4-matx-ddr4", brandId: "b-msi", categoryId: "c-placas", priceUSD: 99, stock: 20, specs: [{ label: "Socket", value: "AM4" }, { label: "Formato", value: "Micro-ATX" }, { label: "Memoria", value: "DDR4" }] },
    { id: "p-1043", sku: "PN:Z790-PRO-RS", name: "Placa Madre ASRock Z790 Pro RS LGA1700 ATX DDR5", slug: "placa-madre-asrock-z790-pro-rs-lga1700-atx-ddr5", brandId: "b-asrock", categoryId: "c-placas", priceUSD: 229, stock: 9, specs: [{ label: "Socket", value: "LGA1700" }, { label: "Formato", value: "ATX" }, { label: "Memoria", value: "DDR5" }] },
    { id: "p-1044", sku: "PN:ROG-STRIX-X670E-E", name: "Placa Madre ASUS ROG Strix X670E-E Gaming AM5 ATX DDR5", slug: "placa-madre-asus-rog-strix-x670e-e-gaming-am5-atx-ddr5", brandId: "b-asus", categoryId: "c-placas", priceUSD: 479, stock: 5, isNew: true, featured: true, specs: [{ label: "Socket", value: "AM5" }, { label: "Formato", value: "ATX" }, { label: "Memoria", value: "DDR5" }] },
    { id: "p-1045", sku: "PN:H610M-H-DDR4", name: "Placa Madre Gigabyte H610M H DDR4 LGA1700 mATX", slug: "placa-madre-gigabyte-h610m-h-ddr4-lga1700-matx", brandId: "b-gigabyte", categoryId: "c-placas", priceUSD: 79, stock: 26, specs: [{ label: "Socket", value: "LGA1700" }, { label: "Formato", value: "Micro-ATX" }, { label: "Memoria", value: "DDR4" }] },
    { id: "p-1046", sku: "PN:MAG-B650-TOMAHAWK-WIFI", name: "Placa Madre MSI MAG B650 Tomahawk WiFi AM5 ATX DDR5", slug: "placa-madre-msi-mag-b650-tomahawk-wifi-am5-atx-ddr5", brandId: "b-msi", categoryId: "c-placas", priceUSD: 219, stock: 11, specs: [{ label: "Socket", value: "AM5" }, { label: "Formato", value: "ATX" }, { label: "Memoria", value: "DDR5" }] },
    { id: "p-1047", sku: "PN:A620M-HDV", name: "Placa Madre ASRock A620M-HDV AM5 mATX DDR5", slug: "placa-madre-asrock-a620m-hdv-am5-matx-ddr5", brandId: "b-asrock", categoryId: "c-placas", priceUSD: 89, stock: 18, isNew: true, specs: [{ label: "Socket", value: "AM5" }, { label: "Formato", value: "Micro-ATX" }, { label: "Memoria", value: "DDR5" }] },
    { id: "p-1048", sku: "PN:CP-9020263-NA", name: "Fuente de Poder Corsair RM750e 750W 80+ Gold ATX 3.0 Full Modular", slug: "fuente-de-poder-corsair-rm750e-750w-80-gold-atx-3-0-full-modular", brandId: "b-corsair", categoryId: "c-fuentes", priceUSD: 99.9, stock: 22, specs: [{ label: "Potencia", value: "750 W" }, { label: "Certificación", value: "80+ Gold" }, { label: "Estándar", value: "ATX 3.0" }] },
    { id: "p-1049", sku: "PN:100-BR-0600-K1", name: "Fuente de Poder EVGA 600 BR 600W 80+ Bronze", slug: "fuente-de-poder-evga-600-br-600w-80-bronze", brandId: "b-evga", categoryId: "c-fuentes", priceUSD: 44.9, stock: 30, specs: [{ label: "Potencia", value: "600 W" }, { label: "Certificación", value: "80+ Bronze" }] },
    { id: "p-1050", sku: "PN:MPY-6501-AFAAG", name: "Fuente de Poder Cooler Master MWE Gold 650W V2 ATX Full Modular", slug: "fuente-de-poder-cooler-master-mwe-gold-650w-v2-atx-full-modular", brandId: "b-coolermaster", categoryId: "c-fuentes", priceUSD: 79.9, stock: 18, specs: [{ label: "Potencia", value: "650 W" }, { label: "Certificación", value: "80+ Gold" }, { label: "Modular", value: "Full" }] },
    { id: "p-1051", sku: "PN:PS-TPD-1000FNFAGE-1", name: "Fuente de Poder Thermaltake Toughpower GF3 1000W 80+ Gold ATX 3.0", slug: "fuente-de-poder-thermaltake-toughpower-gf3-1000w-80-gold-atx-3-0", brandId: "b-thermaltake", categoryId: "c-fuentes", priceUSD: 169, stock: 8, featured: true, specs: [{ label: "Potencia", value: "1000 W" }, { label: "Certificación", value: "80+ Gold" }, { label: "Estándar", value: "ATX 3.0" }] },
    { id: "p-1052", sku: "PN:NE500G-M", name: "Fuente de Poder Antec NeoECO 500W 80+ Bronze", slug: "fuente-de-poder-antec-neoeco-500w-80-bronze", brandId: "b-antec", categoryId: "c-fuentes", priceUSD: 39.9, stock: 26, specs: [{ label: "Potencia", value: "500 W" }, { label: "Certificación", value: "80+ Bronze" }] },
    { id: "p-1053", sku: "PN:MAG-A850GL-PCIE5", name: "Fuente de Poder MSI MAG A850GL 850W 80+ Gold ATX 3.0 Full Modular", slug: "fuente-de-poder-msi-mag-a850gl-850w-80-gold-atx-3-0-full-modular", brandId: "b-msi", categoryId: "c-fuentes", priceUSD: 119, stock: 14, isNew: true, specs: [{ label: "Potencia", value: "850 W" }, { label: "Certificación", value: "80+ Gold" }, { label: "Estándar", value: "ATX 3.0" }] },
    { id: "p-1054", sku: "PN:RR-212S-20PK-R2", name: "Cooler CPU Cooler Master Hyper 212 Black Edition", slug: "cooler-cpu-cooler-master-hyper-212-black-edition", brandId: "b-coolermaster", categoryId: "c-refrigeracion", priceUSD: 29.9, stock: 40, specs: [{ label: "Tipo", value: "Aire" }, { label: "Ventilador", value: "120 mm" }, { label: "Socket", value: "Multi-socket" }] },
    { id: "p-1055", sku: "PN:RL-KR240-B1", name: "Refrigeración Líquida NZXT Kraken 240 RGB AIO", slug: "refrigeracion-liquida-nzxt-kraken-240-rgb-aio", brandId: "b-nzxt", categoryId: "c-refrigeracion", priceUSD: 149, stock: 15, featured: true, specs: [{ label: "Tipo", value: "AIO Líquida" }, { label: "Radiador", value: "240 mm" }, { label: "Iluminación", value: "RGB" }] },
    { id: "p-1056", sku: "PN:CW-9060065-WW", name: "Refrigeración Líquida Corsair iCUE H150i Elite 360mm RGB AIO", slug: "refrigeracion-liquida-corsair-icue-h150i-elite-360mm-rgb-aio", brandId: "b-corsair", categoryId: "c-refrigeracion", priceUSD: 219, stock: 9, featured: true, specs: [{ label: "Tipo", value: "AIO Líquida" }, { label: "Radiador", value: "360 mm" }, { label: "Iluminación", value: "RGB" }] },
    { id: "p-1057", sku: "PN:R-AK400-BKNNMT-G", name: "Cooler CPU Deepcool AK400 Digital Black", slug: "cooler-cpu-deepcool-ak400-digital-black", brandId: "b-deepcool", categoryId: "c-refrigeracion", priceUSD: 39.9, stock: 28, specs: [{ label: "Tipo", value: "Aire" }, { label: "Ventilador", value: "120 mm" }, { label: "Display", value: "Digital" }] },
    { id: "p-1058", sku: "PN:CL-F072-PL12SW-A", name: "Pack 3 Ventiladores Thermaltake Riing 12 RGB 120mm", slug: "pack-3-ventiladores-thermaltake-riing-12-rgb-120mm", brandId: "b-thermaltake", categoryId: "c-refrigeracion", priceUSD: 49.9, stock: 24, specs: [{ label: "Cantidad", value: "3" }, { label: "Tamaño", value: "120 mm" }, { label: "Iluminación", value: "RGB" }] },
    { id: "p-1059", sku: "PN:MGZ-NDSG-N15M-R1", name: "Pasta Térmica Cooler Master MasterGel Maker Nano 4g", slug: "pasta-termica-cooler-master-mastergel-maker-nano-4g", brandId: "b-coolermaster", categoryId: "c-refrigeracion", priceUSD: 12.9, stock: 50, specs: [{ label: "Contenido", value: "4 g" }, { label: "Conductividad", value: "Alta" }] },
    { id: "p-1060", sku: "PN:R-LS520-BKAMSE-G", name: "Refrigeración Líquida Deepcool LS520 SE 240mm ARGB AIO", slug: "refrigeracion-liquida-deepcool-ls520-se-240mm-argb-aio", brandId: "b-deepcool", categoryId: "c-refrigeracion", priceUSD: 99.9, stock: 13, isNew: true, specs: [{ label: "Tipo", value: "AIO Líquida" }, { label: "Radiador", value: "240 mm" }, { label: "Iluminación", value: "ARGB" }] },
    { id: "p-1061", sku: "PN:CL-P065-AL12SW-A", name: "Cooler CPU Thermaltake UX200 ARGB", slug: "cooler-cpu-thermaltake-ux200-argb", brandId: "b-thermaltake", categoryId: "c-refrigeracion", priceUSD: 24.9, stock: 35, specs: [{ label: "Tipo", value: "Aire" }, { label: "Ventilador", value: "120 mm" }, { label: "Iluminación", value: "ARGB" }] },
    { id: "p-1062", sku: "PN:CC-H51FB-01", name: "Gabinete NZXT H5 Flow Mid Tower ATX con Panel de Vidrio Templado", slug: "gabinete-nzxt-h5-flow-mid-tower-atx-con-panel-de-vidrio-templado", brandId: "b-nzxt", categoryId: "c-gabinetes", priceUSD: 89.9, stock: 20, featured: true, specs: [{ label: "Formato", value: "Mid Tower" }, { label: "Compatibilidad", value: "ATX" }, { label: "Panel", value: "Vidrio templado" }] },
    { id: "p-1063", sku: "PN:MCB-D500D-KANN-S01", name: "Gabinete Cooler Master MasterBox TD500 Mesh ARGB Mid Tower", slug: "gabinete-cooler-master-masterbox-td500-mesh-argb-mid-tower", brandId: "b-coolermaster", categoryId: "c-gabinetes", priceUSD: 99.9, stock: 16, specs: [{ label: "Formato", value: "Mid Tower" }, { label: "Compatibilidad", value: "ATX" }, { label: "Ventiladores", value: "3x ARGB incluidos" }] },
    { id: "p-1064", sku: "PN:CC-9011200-WW", name: "Gabinete Corsair 4000D Airflow Mid Tower ATX", slug: "gabinete-corsair-4000d-airflow-mid-tower-atx", brandId: "b-corsair", categoryId: "c-gabinetes", priceUSD: 109, stock: 18, featured: true, specs: [{ label: "Formato", value: "Mid Tower" }, { label: "Compatibilidad", value: "ATX" }, { label: "Panel", value: "Malla Airflow" }] },
    { id: "p-1065", sku: "PN:CA-1X5-00M1WN-00", name: "Gabinete Thermaltake View 200 ARGB Mid Tower Vidrio Templado", slug: "gabinete-thermaltake-view-200-argb-mid-tower-vidrio-templado", brandId: "b-thermaltake", categoryId: "c-gabinetes", priceUSD: 79.9, stock: 22, specs: [{ label: "Formato", value: "Mid Tower" }, { label: "Compatibilidad", value: "ATX" }, { label: "Panel", value: "Vidrio templado" }] },
    { id: "p-1066", sku: "PN:FD-C-NOR1A-04", name: "Gabinete Fractal Design North Mid Tower Madera y Malla", slug: "gabinete-fractal-design-north-mid-tower-madera-y-malla", brandId: "b-fractal", categoryId: "c-gabinetes", priceUSD: 149, stock: 10, isNew: true, specs: [{ label: "Formato", value: "Mid Tower" }, { label: "Compatibilidad", value: "ATX" }, { label: "Diseño", value: "Madera/Malla" }] },
    { id: "p-1067", sku: "PN:R-CH510-BKNGE1-G-1", name: "Gabinete Deepcool CH510 Mesh Mid Tower ATX", slug: "gabinete-deepcool-ch510-mesh-mid-tower-atx", brandId: "b-deepcool", categoryId: "c-gabinetes", priceUSD: 69.9, stock: 24, specs: [{ label: "Formato", value: "Mid Tower" }, { label: "Compatibilidad", value: "ATX" }, { label: "Panel", value: "Malla frontal" }] },
    { id: "p-1068", sku: "PN:27GP850-B", name: "Monitor LG UltraGear 27GP850 27\" 2K 165Hz Nano IPS", slug: "monitor-lg-ultragear-27gp850-27-2k-165hz-nano-ips", brandId: "b-lg", categoryId: "c-monitores", priceUSD: 349, stock: 12, featured: true, specs: [{ label: "Tamaño", value: "27\"" }, { label: "Resolución", value: "2560x1440 (2K)" }, { label: "Refresco", value: "165 Hz" }, { label: "Panel", value: "Nano IPS" }] },
    { id: "p-1069", sku: "PN:LS27CG510EL", name: "Monitor Samsung Odyssey G5 27\" 2K 165Hz VA Curvo", slug: "monitor-samsung-odyssey-g5-27-2k-165hz-va-curvo", brandId: "b-samsung", categoryId: "c-monitores", priceUSD: 259, stock: 15, specs: [{ label: "Tamaño", value: "27\"" }, { label: "Resolución", value: "2560x1440 (2K)" }, { label: "Refresco", value: "165 Hz" }, { label: "Panel", value: "VA Curvo" }] },
    { id: "p-1070", sku: "PN:24G2SP", name: "Monitor AOC 24G2SP 24\" FHD 165Hz IPS Gaming", slug: "monitor-aoc-24g2sp-24-fhd-165hz-ips-gaming", brandId: "b-aoc", categoryId: "c-monitores", priceUSD: 149, stock: 20, specs: [{ label: "Tamaño", value: "24\"" }, { label: "Resolución", value: "1920x1080 (FHD)" }, { label: "Refresco", value: "165 Hz" }, { label: "Panel", value: "IPS" }] },
    { id: "p-1071", sku: "PN:EX2710Q", name: "Monitor BenQ Mobiuz EX2710Q 27\" 2K 165Hz IPS HDR", slug: "monitor-benq-mobiuz-ex2710q-27-2k-165hz-ips-hdr", brandId: "b-benq", categoryId: "c-monitores", priceUSD: 329, stock: 9, specs: [{ label: "Tamaño", value: "27\"" }, { label: "Resolución", value: "2560x1440 (2K)" }, { label: "Refresco", value: "165 Hz" }, { label: "HDR", value: "Sí" }] },
    { id: "p-1072", sku: "PN:XG270QG", name: "Monitor ViewSonic Elite XG270QG 27\" 2K 240Hz IPS", slug: "monitor-viewsonic-elite-xg270qg-27-2k-240hz-ips", brandId: "b-viewsonic", categoryId: "c-monitores", priceUSD: 449, stock: 6, isNew: true, featured: true, specs: [{ label: "Tamaño", value: "27\"" }, { label: "Resolución", value: "2560x1440 (2K)" }, { label: "Refresco", value: "240 Hz" }, { label: "Panel", value: "IPS" }] },
    { id: "p-1073", sku: "PN:VG249Q3A", name: "Monitor ASUS TUF Gaming VG249Q3A 24\" FHD 180Hz IPS", slug: "monitor-asus-tuf-gaming-vg249q3a-24-fhd-180hz-ips", brandId: "b-asus", categoryId: "c-monitores", priceUSD: 169, stock: 18, specs: [{ label: "Tamaño", value: "24\"" }, { label: "Resolución", value: "1920x1080 (FHD)" }, { label: "Refresco", value: "180 Hz" }, { label: "Panel", value: "IPS" }] },
    { id: "p-1074", sku: "PN:OPTIX-G32C4", name: "Monitor MSI Optix G32C4 32\" FHD 170Hz VA Curvo", slug: "monitor-msi-optix-g32c4-32-fhd-170hz-va-curvo", brandId: "b-msi", categoryId: "c-monitores", priceUSD: 209, stock: 11, specs: [{ label: "Tamaño", value: "32\"" }, { label: "Resolución", value: "1920x1080 (FHD)" }, { label: "Refresco", value: "170 Hz" }, { label: "Panel", value: "VA Curvo" }] },
    { id: "p-1075", sku: "PN:32GS60QC-B", name: "Monitor LG 32\" UltraGear 32GS60QC-B 2K 180Hz OLED Curvo", slug: "monitor-lg-32-ultragear-32gs60qc-b-2k-180hz-oled-curvo", brandId: "b-lg", categoryId: "c-monitores", priceUSD: 549, stock: 4, isNew: true, featured: true, specs: [{ label: "Tamaño", value: "32\"" }, { label: "Resolución", value: "2560x1440 (2K)" }, { label: "Refresco", value: "180 Hz" }, { label: "Panel", value: "OLED Curvo" }] },
    { id: "p-1076", sku: "PN:LS32BM801UPXPE", name: "Monitor Samsung Smart Monitor M8 32\" 4K UHD", slug: "monitor-samsung-smart-monitor-m8-32-4k-uhd", brandId: "b-samsung", categoryId: "c-monitores", priceUSD: 429, stock: 7, specs: [{ label: "Tamaño", value: "32\"" }, { label: "Resolución", value: "3840x2160 (4K)" }, { label: "Refresco", value: "60 Hz" }, { label: "Smart TV", value: "Sí" }] },
    { id: "p-1077", sku: "PN:Q27G3XMN", name: "Monitor AOC Q27G3XMN 27\" 2K 180Hz VA", slug: "monitor-aoc-q27g3xmn-27-2k-180hz-va", brandId: "b-aoc", categoryId: "c-monitores", priceUSD: 219, stock: 13, isNew: true, specs: [{ label: "Tamaño", value: "27\"" }, { label: "Resolución", value: "2560x1440 (2K)" }, { label: "Refresco", value: "180 Hz" }, { label: "Panel", value: "VA" }] },
    { id: "p-1078", sku: "PN:910-006632", name: "Mouse Logitech G Pro X Superlight 2 Wireless", slug: "mouse-logitech-g-pro-x-superlight-2-wireless", brandId: "b-logitech", categoryId: "c-perifericos", priceUSD: 149, stock: 16, featured: true, specs: [{ label: "Tipo", value: "Inalámbrico" }, { label: "Sensor", value: "HERO 2" }, { label: "Peso", value: "60 g" }] },
    { id: "p-1079", sku: "PN:RZ01-04640100-R3U1", name: "Mouse Razer DeathAdder V3 Wired", slug: "mouse-razer-deathadder-v3-wired", brandId: "b-razer", categoryId: "c-perifericos", priceUSD: 69.9, stock: 22, specs: [{ label: "Tipo", value: "Alámbrico" }, { label: "Sensor", value: "Focus Pro 30K" }, { label: "DPI", value: "30000" }] },
    { id: "p-1080", sku: "PN:RZ03-05070100-R3U1", name: "Teclado Mecánico Razer Huntsman V3 Pro Switch Óptico", slug: "teclado-mecanico-razer-huntsman-v3-pro-switch-optico", brandId: "b-razer", categoryId: "c-perifericos", priceUSD: 249, stock: 8, featured: true, specs: [{ label: "Tipo", value: "Mecánico" }, { label: "Switch", value: "Óptico Analógico" }, { label: "Iluminación", value: "RGB" }] },
    { id: "p-1081", sku: "PN:4P5D5AA", name: "Teclado HyperX Alloy Origins Core Switch HyperX Red", slug: "teclado-hyperx-alloy-origins-core-switch-hyperx-red", brandId: "b-hyperx", categoryId: "c-perifericos", priceUSD: 89.9, stock: 18, specs: [{ label: "Tipo", value: "Mecánico" }, { label: "Switch", value: "HyperX Red" }, { label: "Formato", value: "TKL" }] },
    { id: "p-1082", sku: "PN:61684", name: "Auriculares Gamer SteelSeries Arctis Nova 5 Wireless", slug: "auriculares-gamer-steelseries-arctis-nova-5-wireless", brandId: "b-steelseries", categoryId: "c-perifericos", priceUSD: 149, stock: 14, featured: true, specs: [{ label: "Tipo", value: "Inalámbrico" }, { label: "Sonido", value: "7.1 Virtual" }, { label: "Micrófono", value: "Retráctil" }] },
    { id: "p-1083", sku: "PN:6H9C1AA", name: "Auriculares Gamer HyperX Cloud III Wired", slug: "auriculares-gamer-hyperx-cloud-iii-wired", brandId: "b-hyperx", categoryId: "c-perifericos", priceUSD: 79.9, stock: 26, specs: [{ label: "Tipo", value: "Alámbrico" }, { label: "Sonido", value: "7.1 Virtual" }, { label: "Drivers", value: "53 mm" }] },
    { id: "p-1084", sku: "PN:981-001050", name: "Auriculares Gamer Logitech G435 Lightspeed Wireless", slug: "auriculares-gamer-logitech-g435-lightspeed-wireless", brandId: "b-logitech", categoryId: "c-perifericos", priceUSD: 69.9, stock: 20, specs: [{ label: "Tipo", value: "Inalámbrico" }, { label: "Conexión", value: "Bluetooth/Lightspeed" }, { label: "Peso", value: "165 g" }] },
    { id: "p-1085", sku: "PN:RZ02-03330400-R3M1", name: "Mousepad Razer Gigantus V2 XXL 940x410mm", slug: "mousepad-razer-gigantus-v2-xxl-940x410mm", brandId: "b-razer", categoryId: "c-perifericos", priceUSD: 34.9, stock: 30, specs: [{ label: "Tamaño", value: "940x410 mm" }, { label: "Superficie", value: "Tela" }] },
    { id: "p-1086", sku: "PN:HX-MPFS-XL", name: "Mousepad HyperX Fury S Pro XL RGB", slug: "mousepad-hyperx-fury-s-pro-xl-rgb", brandId: "b-hyperx", categoryId: "c-perifericos", priceUSD: 29.9, stock: 25, specs: [{ label: "Tamaño", value: "900x420 mm" }, { label: "Iluminación", value: "RGB" }] },
    { id: "p-1087", sku: "PN:K552", name: "Teclado Mecánico Redragon Kumara K552 Switch Blue", slug: "teclado-mecanico-redragon-kumara-k552-switch-blue", brandId: "b-redragon", categoryId: "c-perifericos", priceUSD: 34.9, stock: 35, specs: [{ label: "Tipo", value: "Mecánico" }, { label: "Switch", value: "Blue" }, { label: "Formato", value: "TKL" }] },
    { id: "p-1088", sku: "PN:M711", name: "Mouse Redragon Cobra M711 RGB", slug: "mouse-redragon-cobra-m711-rgb", brandId: "b-redragon", categoryId: "c-perifericos", priceUSD: 24.9, stock: 40, specs: [{ label: "Tipo", value: "Alámbrico" }, { label: "DPI", value: "10000" }, { label: "Iluminación", value: "RGB" }] },
    { id: "p-1089", sku: "PN:960-001055", name: "Webcam Logitech C920 HD Pro Full HD 1080p", slug: "webcam-logitech-c920-hd-pro-full-hd-1080p", brandId: "b-logitech", categoryId: "c-perifericos", priceUSD: 79.9, stock: 17, specs: [{ label: "Resolución", value: "1080p" }, { label: "FPS", value: "30" }, { label: "Enfoque", value: "Automático" }] },
    { id: "p-1090", sku: "PN:QAT-00002", name: "Control Xbox Wireless Controller Carbon Black", slug: "control-xbox-wireless-controller-carbon-black", brandId: "b-msi", categoryId: "c-perifericos", priceUSD: 59.9, stock: 24, specs: [{ label: "Conexión", value: "Bluetooth/USB" }, { label: "Compatibilidad", value: "Xbox/PC" }, { label: "Batería", value: "AA" }] },
    { id: "p-1091", sku: "PN:CA-9011260-NA", name: "Auriculares Gamer Corsair HS55 Surround Wired", slug: "auriculares-gamer-corsair-hs55-surround-wired", brandId: "b-corsair", categoryId: "c-perifericos", priceUSD: 59.9, stock: 22, specs: [{ label: "Tipo", value: "Alámbrico" }, { label: "Sonido", value: "Surround" }, { label: "Drivers", value: "50 mm" }] },
    { id: "p-1092", sku: "PN:920-010498", name: "Teclado Inalámbrico Logitech MX Keys Mini", slug: "teclado-inalambrico-logitech-mx-keys-mini", brandId: "b-logitech", categoryId: "c-perifericos", priceUSD: 99.9, stock: 15, isNew: true, specs: [{ label: "Tipo", value: "Membrana" }, { label: "Conexión", value: "Bluetooth" }, { label: "Retroiluminación", value: "Sí" }] },
    { id: "p-1093", sku: "PN:ROG-GLADIUS-III-WL-AP", name: "Mouse ASUS ROG Gladius III Wireless AimPoint", slug: "mouse-asus-rog-gladius-iii-wireless-aimpoint", brandId: "b-asus", categoryId: "c-perifericos", priceUSD: 129, stock: 10, isNew: true, specs: [{ label: "Tipo", value: "Inalámbrico" }, { label: "Sensor", value: "AimPoint 36K" }, { label: "DPI", value: "36000" }] },
    { id: "p-1094", sku: "PN:HMIQ1S-XX-RG/G", name: "Micrófono Condensador HyperX QuadCast S USB RGB", slug: "microfono-condensador-hyperx-quadcast-s-usb-rgb", brandId: "b-hyperx", categoryId: "c-streaming", priceUSD: 149, stock: 10, featured: true, specs: [{ label: "Tipo", value: "Condensador USB" }, { label: "Patrones", value: "4" }, { label: "Iluminación", value: "RGB" }] },
    { id: "p-1095", sku: "PN:RZ19-05050100-R3U1", name: "Micrófono Razer Seiren V3 Mini USB", slug: "microfono-razer-seiren-v3-mini-usb", brandId: "b-razer", categoryId: "c-streaming", priceUSD: 49.9, stock: 18, specs: [{ label: "Tipo", value: "Condensador USB" }, { label: "Tamaño", value: "Compacto" }] },
    { id: "p-1096", sku: "PN:10GAM9901", name: "Capturadora de Video Elgato Cam Link 4K", slug: "capturadora-de-video-elgato-cam-link-4k", brandId: "b-elgato", categoryId: "c-streaming", priceUSD: 129, stock: 8, specs: [{ label: "Resolución", value: "4K30 / 1080p60" }, { label: "Interfaz", value: "USB 3.0" }] },
    { id: "p-1097", sku: "PN:1GC109901002", name: "Capturadora de Video Elgato HD60 X", slug: "capturadora-de-video-elgato-hd60-x", brandId: "b-elgato", categoryId: "c-streaming", priceUSD: 179, stock: 6, isNew: true, featured: true, specs: [{ label: "Resolución", value: "4K60 HDR10" }, { label: "Interfaz", value: "USB 3.0" }] },
    { id: "p-1098", sku: "PN:RL-26-TRIPOD", name: "Aro de Luz LED 26cm con Trípode y Soporte para Celular", slug: "aro-de-luz-led-26cm-con-tripode-y-soporte-para-celular", brandId: "b-elgato", categoryId: "c-streaming", priceUSD: 29.9, stock: 30, specs: [{ label: "Diámetro", value: "26 cm" }, { label: "Temperatura", value: "3200-5600K" }] },
    { id: "p-1099", sku: "PN:JBLQUANTUMDUOAM", name: "Parlantes JBL Quantum Duo Gaming USB/Bluetooth", slug: "parlantes-jbl-quantum-duo-gaming-usb-bluetooth", brandId: "b-jbl", categoryId: "c-streaming", priceUSD: 129, stock: 12, isNew: true, specs: [{ label: "Configuración", value: "2.0" }, { label: "Conexión", value: "USB/Bluetooth" }] },
    { id: "p-1100", sku: "PN:82XV00JQLM", name: "Laptop Lenovo LOQ 15 Ryzen 7 7435HS RTX 4060 16GB 512GB SSD 15.6\" FHD 144Hz", slug: "laptop-lenovo-loq-15-ryzen-7-7435hs-rtx-4060-16gb-512gb-ssd-15-6-fhd-144hz", brandId: "b-lenovo", categoryId: "c-laptops", priceUSD: 999, stock: 8, featured: true, specs: [{ label: "Procesador", value: "Ryzen 7 7435HS" }, { label: "GPU", value: "RTX 4060" }, { label: "RAM", value: "16 GB" }, { label: "Almacenamiento", value: "512 GB SSD" }] },
    { id: "p-1101", sku: "PN:9Q4Z8LA", name: "Laptop HP Victus 15 Core i5-13420H RTX 4050 16GB 512GB SSD 15.6\" FHD 144Hz", slug: "laptop-hp-victus-15-core-i5-13420h-rtx-4050-16gb-512gb-ssd-15-6-fhd-144hz", brandId: "b-hp", categoryId: "c-laptops", priceUSD: 869, stock: 10, specs: [{ label: "Procesador", value: "Core i5-13420H" }, { label: "GPU", value: "RTX 4050" }, { label: "RAM", value: "16 GB" }, { label: "Almacenamiento", value: "512 GB SSD" }] },
    { id: "p-1102", sku: "PN:FA507NV-LP095W", name: "Laptop ASUS TUF Gaming A15 Ryzen 7 7735HS RTX 4070 16GB 1TB SSD 15.6\" FHD 165Hz", slug: "laptop-asus-tuf-gaming-a15-ryzen-7-7735hs-rtx-4070-16gb-1tb-ssd-15-6-fhd-165hz", brandId: "b-asus", categoryId: "c-laptops", priceUSD: 1299, stock: 5, isNew: true, featured: true, specs: [{ label: "Procesador", value: "Ryzen 7 7735HS" }, { label: "GPU", value: "RTX 4070" }, { label: "RAM", value: "16 GB" }, { label: "Almacenamiento", value: "1 TB SSD" }] },
    { id: "p-1103", sku: "PN:INS3520-I5-8-512", name: "Laptop Dell Inspiron 15 3520 Core i5-1235U 8GB 512GB SSD 15.6\" FHD", slug: "laptop-dell-inspiron-15-3520-core-i5-1235u-8gb-512gb-ssd-15-6-fhd", brandId: "b-dell", categoryId: "c-laptops", priceUSD: 599, stock: 14, specs: [{ label: "Procesador", value: "Core i5-1235U" }, { label: "RAM", value: "8 GB" }, { label: "Almacenamiento", value: "512 GB SSD" }] },
    { id: "p-1104", sku: "PN:ANV15-51-58GT", name: "Laptop Acer Nitro V 15 Core i5-13420H RTX 4050 16GB 512GB SSD 15.6\" FHD 144Hz", slug: "laptop-acer-nitro-v-15-core-i5-13420h-rtx-4050-16gb-512gb-ssd-15-6-fhd-144hz", brandId: "b-acer", categoryId: "c-laptops", priceUSD: 849, stock: 9, specs: [{ label: "Procesador", value: "Core i5-13420H" }, { label: "GPU", value: "RTX 4050" }, { label: "RAM", value: "16 GB" }, { label: "Almacenamiento", value: "512 GB SSD" }] },
    { id: "p-1105", sku: "PN:KATANA-15-B13V", name: "Laptop MSI Katana 15 Core i7-13620H RTX 4060 16GB 1TB SSD 15.6\" FHD 144Hz", slug: "laptop-msi-katana-15-core-i7-13620h-rtx-4060-16gb-1tb-ssd-15-6-fhd-144hz", brandId: "b-msi", categoryId: "c-laptops", priceUSD: 1099, stock: 6, featured: true, specs: [{ label: "Procesador", value: "Core i7-13620H" }, { label: "GPU", value: "RTX 4060" }, { label: "RAM", value: "16 GB" }, { label: "Almacenamiento", value: "1 TB SSD" }] },
    { id: "p-1106", sku: "PN:82XM0090LM", name: "Laptop Lenovo IdeaPad Slim 3 Ryzen 5 7530U 8GB 512GB SSD 15.6\" FHD", slug: "laptop-lenovo-ideapad-slim-3-ryzen-5-7530u-8gb-512gb-ssd-15-6-fhd", brandId: "b-lenovo", categoryId: "c-laptops", priceUSD: 499, stock: 20, specs: [{ label: "Procesador", value: "Ryzen 5 7530U" }, { label: "RAM", value: "8 GB" }, { label: "Almacenamiento", value: "512 GB SSD" }] },
    { id: "p-1107", sku: "PN:PAV15-I7-16-512", name: "Laptop HP Pavilion 15 Core i7-1355U 16GB 512GB SSD 15.6\" FHD", slug: "laptop-hp-pavilion-15-core-i7-1355u-16gb-512gb-ssd-15-6-fhd", brandId: "b-hp", categoryId: "c-laptops", priceUSD: 749, stock: 12, specs: [{ label: "Procesador", value: "Core i7-1355U" }, { label: "RAM", value: "16 GB" }, { label: "Almacenamiento", value: "512 GB SSD" }] },
    { id: "p-1108", sku: "PN:G614JV-N4184W", name: "Laptop ASUS ROG Strix G16 Core i9-14900HX RTX 4080 32GB 1TB SSD 16\" QHD 240Hz", slug: "laptop-asus-rog-strix-g16-core-i9-14900hx-rtx-4080-32gb-1tb-ssd-16-qhd-240hz", brandId: "b-asus", categoryId: "c-laptops", priceUSD: 2199, stock: 3, isNew: true, featured: true, specs: [{ label: "Procesador", value: "Core i9-14900HX" }, { label: "GPU", value: "RTX 4080" }, { label: "RAM", value: "32 GB" }, { label: "Almacenamiento", value: "1 TB SSD" }] },
    { id: "p-1109", sku: "PN:A315-59-31LU", name: "Laptop Acer Aspire 3 Core i3-1215U 8GB 256GB SSD 15.6\" FHD", slug: "laptop-acer-aspire-3-core-i3-1215u-8gb-256gb-ssd-15-6-fhd", brandId: "b-acer", categoryId: "c-laptops", priceUSD: 429, stock: 25, specs: [{ label: "Procesador", value: "Core i3-1215U" }, { label: "RAM", value: "8 GB" }, { label: "Almacenamiento", value: "256 GB SSD" }] },
    { id: "p-1110", sku: "PN:MRXW3E/A", name: "Apple MacBook Air 13\" M3 8GB 256GB SSD Midnight", slug: "apple-macbook-air-13-m3-8gb-256gb-ssd-midnight", brandId: "b-apple", categoryId: "c-apple", priceUSD: 1099, stock: 7, featured: true, specs: [{ label: "Chip", value: "Apple M3" }, { label: "RAM", value: "8 GB" }, { label: "Almacenamiento", value: "256 GB SSD" }, { label: "Pantalla", value: "13\" Liquid Retina" }] },
    { id: "p-1111", sku: "PN:MW2W3E/A", name: "Apple MacBook Pro 14\" M4 16GB 512GB SSD Space Black", slug: "apple-macbook-pro-14-m4-16gb-512gb-ssd-space-black", brandId: "b-apple", categoryId: "c-apple", priceUSD: 1999, stock: 4, isNew: true, featured: true, specs: [{ label: "Chip", value: "Apple M4" }, { label: "RAM", value: "16 GB" }, { label: "Almacenamiento", value: "512 GB SSD" }, { label: "Pantalla", value: "14\" Liquid Retina XDR" }] },
    { id: "p-1112", sku: "PN:MPQ03LZ/A", name: "Apple iPad 10.9\" Wi-Fi 64GB", slug: "apple-ipad-10-9-wi-fi-64gb", brandId: "b-apple", categoryId: "c-apple", priceUSD: 449, stock: 15, specs: [{ label: "Pantalla", value: "10.9\" Liquid Retina" }, { label: "Almacenamiento", value: "64 GB" }, { label: "Conectividad", value: "Wi-Fi" }] },
    { id: "p-1113", sku: "PN:MVVC3LZ/A", name: "Apple iPad Pro 11\" M4 Wi-Fi 256GB", slug: "apple-ipad-pro-11-m4-wi-fi-256gb", brandId: "b-apple", categoryId: "c-apple", priceUSD: 1299, stock: 5, isNew: true, specs: [{ label: "Chip", value: "Apple M4" }, { label: "Pantalla", value: "11\" Ultra Retina XDR" }, { label: "Almacenamiento", value: "256 GB" }] },
    { id: "p-1114", sku: "PN:MXP63AM/A", name: "Apple AirPods 4 con Estuche de Carga MagSafe", slug: "apple-airpods-4-con-estuche-de-carga-magsafe", brandId: "b-apple", categoryId: "c-apple", priceUSD: 149, stock: 22, specs: [{ label: "Tipo", value: "In-ear" }, { label: "Cancelación de ruido", value: "No" }, { label: "Estuche", value: "MagSafe" }] },
    { id: "p-1115", sku: "PN:MTJV3AM/A", name: "Apple AirPods Pro 2 con Estuche MagSafe USB-C", slug: "apple-airpods-pro-2-con-estuche-magsafe-usb-c", brandId: "b-apple", categoryId: "c-apple", priceUSD: 249, stock: 12, featured: true, specs: [{ label: "Tipo", value: "In-ear" }, { label: "Cancelación de ruido", value: "Activa" }, { label: "Estuche", value: "MagSafe USB-C" }] },
    { id: "p-1116", sku: "PN:MRE13LW/A", name: "Apple Watch SE 2da Gen GPS 44mm Midnight Aluminum", slug: "apple-watch-se-2da-gen-gps-44mm-midnight-aluminum", brandId: "b-apple", categoryId: "c-apple", priceUSD: 279, stock: 10, specs: [{ label: "Tamaño", value: "44 mm" }, { label: "Conectividad", value: "GPS" }, { label: "Material", value: "Aluminio" }] },
    { id: "p-1117", sku: "PN:GMX-PC-R5-4060", name: "PC Gamer Ryzen 5 5600 RTX 4060 16GB DDR4 500GB SSD", slug: "pc-gamer-ryzen-5-5600-rtx-4060-16gb-ddr4-500gb-ssd", brandId: "b-amd", categoryId: "c-configuraciones", priceUSD: 799, stock: 6, featured: true, specs: [{ label: "Procesador", value: "Ryzen 5 5600" }, { label: "GPU", value: "RTX 4060" }, { label: "RAM", value: "16 GB DDR4" }, { label: "Almacenamiento", value: "500 GB SSD" }] },
    { id: "p-1118", sku: "PN:GMX-PC-I5-4060TI", name: "PC Gamer Intel Core i5-14400F RTX 4060 Ti 16GB DDR5 1TB SSD", slug: "pc-gamer-intel-core-i5-14400f-rtx-4060-ti-16gb-ddr5-1tb-ssd", brandId: "b-intel", categoryId: "c-configuraciones", priceUSD: 999, stock: 5, featured: true, specs: [{ label: "Procesador", value: "Core i5-14400F" }, { label: "GPU", value: "RTX 4060 Ti" }, { label: "RAM", value: "16 GB DDR5" }, { label: "Almacenamiento", value: "1 TB SSD" }] },
    { id: "p-1119", sku: "PN:GMX-PC-R7-4070S", name: "PC Gamer Ryzen 7 7700X RTX 4070 Super 32GB DDR5 1TB SSD", slug: "pc-gamer-ryzen-7-7700x-rtx-4070-super-32gb-ddr5-1tb-ssd", brandId: "b-amd", categoryId: "c-configuraciones", priceUSD: 1599, stock: 3, isNew: true, featured: true, specs: [{ label: "Procesador", value: "Ryzen 7 7700X" }, { label: "GPU", value: "RTX 4070 Super" }, { label: "RAM", value: "32 GB DDR5" }, { label: "Almacenamiento", value: "1 TB SSD" }] },
    { id: "p-1120", sku: "PN:GMX-PC-I3-OFFICE", name: "PC Oficina Intel Core i3-14100F 8GB DDR4 240GB SSD", slug: "pc-oficina-intel-core-i3-14100f-8gb-ddr4-240gb-ssd", brandId: "b-intel", categoryId: "c-configuraciones", priceUSD: 379, stock: 14, specs: [{ label: "Procesador", value: "Core i3-14100F" }, { label: "RAM", value: "8 GB DDR4" }, { label: "Almacenamiento", value: "240 GB SSD" }] },
    { id: "p-1121", sku: "PN:GMX-PC-R9-4080S", name: "PC Gamer Ryzen 9 7900X RTX 4080 Super 32GB DDR5 2TB SSD", slug: "pc-gamer-ryzen-9-7900x-rtx-4080-super-32gb-ddr5-2tb-ssd", brandId: "b-amd", categoryId: "c-configuraciones", priceUSD: 2499, stock: 2, onRequest: true, isNew: true, featured: true, specs: [{ label: "Procesador", value: "Ryzen 9 7900X" }, { label: "GPU", value: "RTX 4080 Super" }, { label: "RAM", value: "32 GB DDR5" }, { label: "Almacenamiento", value: "2 TB SSD" }] },
    { id: "p-1122", sku: "PN:GMX-PC-R5-STREAM", name: "PC Streaming Ryzen 5 7600X RTX 4060 Ti 32GB DDR5 1TB SSD", slug: "pc-streaming-ryzen-5-7600x-rtx-4060-ti-32gb-ddr5-1tb-ssd", brandId: "b-amd", categoryId: "c-configuraciones", priceUSD: 1099, stock: 4, isNew: true, specs: [{ label: "Procesador", value: "Ryzen 5 7600X" }, { label: "GPU", value: "RTX 4060 Ti" }, { label: "RAM", value: "32 GB DDR5" }, { label: "Almacenamiento", value: "1 TB SSD" }] },
  ];

  for (const p of productsData) {
    await db.product.create({
      data: {
        id: p.id,
        sku: p.sku,
        name: p.name,
        slug: p.slug,
        brandId: p.brandId,
        categoryId: p.categoryId,
        priceUSD: p.priceUSD,
        stock: p.stock,
        description: p.description ?? null,
        specs: p.specs ?? undefined,
        isNew: p.isNew ?? false,
        featured: p.featured ?? false,
        onRequest: p.onRequest ?? false,
      },
    });
  }
  console.log(`  ${productsData.length} products`);

  // Product images (one specific image per product)
  const productImageMap: Record<string, string> = {
    "p-1": "/images/products/p1-corsair-ram.jpg",
    "p-2": "/images/products/p2-kingston-ram.jpg",
    "p-3": "/images/products/p3-tforce-ram.jpg",
    "p-4": "/images/products/p4-processor.jpg",
    "p-5": "/images/products/p9-thermal.jpg",
    "p-6": "/images/products/p6-puskill-ram.jpg",
    "p-7": "/images/products/p16-gpu-msi-5070.jpg",
    "p-8": "/images/products/p15-gpu-inno3d-5070ti.jpg",
    "p-9": "/images/products/p14-gpu-inno3d-5060.jpg",
    "p-10": "/images/products/p17-gpu-palit-5050.jpg",
    "p-11": "/images/products/p13-gpu-asus.jpg",
    "p-12": "/images/products/p19.jpg",
    "p-13": "/images/products/p10-motherboard.jpg",
    "p-14": "/images/products/p12-ssd.jpg",
    "p-15": "/images/products/p5-gskill-ram.jpg",
    "p-16": "/images/products/p7-monitor.jpg",
    "p-17": "/images/products/p18-keyboard.jpg",
    "p-18": "/images/products/p8-speakers.jpg",
  };
  // Map all new products (p-1000 to p-1122) to generated placeholder images
  for (let i = 1000; i <= 1122; i++) {
    productImageMap[`p-${i}`] = `/images/products/p-${i}.jpg`;
  }
  for (const p of productsData) {
    await db.productImage.create({
      data: {
        productId: p.id,
        url: productImageMap[p.id] ?? "/images/products/generic.jpg",
        alt: p.name,
        position: 0,
      },
    });
  }
  console.log(`  ${productsData.length} product images`);

  // Users (with placeholder password hash "gamex123")
  const placeholderHash = "$2b$10$dummy_hash_for_dev";
  const users = await Promise.all([
    db.user.create({ data: { id: "u-1", name: "Brayan Vargas", email: "brayanvargassedano@gmail.com", passwordHash: placeholderHash, phone: "+51 987 654 321", document: "70123456", role: "CLIENTE", status: "ACTIVO", createdAt: new Date("2026-01-12T10:00:00.000Z") } }),
    db.user.create({ data: { id: "u-2", name: "Lucía Fernández", email: "lucia.fernandez@gmail.com", passwordHash: placeholderHash, phone: "+51 956 112 233", role: "CLIENTE", status: "ACTIVO", createdAt: new Date("2026-02-03T15:30:00.000Z") } }),
    db.user.create({ data: { id: "u-3", name: "Diego Ramírez", email: "diego.ramirez@outlook.com", passwordHash: placeholderHash, phone: "+51 944 778 990", role: "CLIENTE", status: "INACTIVO", createdAt: new Date("2026-03-21T09:15:00.000Z") } }),
    db.user.create({ data: { id: "u-4", name: "Andrea Salas", email: "andrea.salas@gmail.com", passwordHash: placeholderHash, phone: "+51 933 221 100", role: "CLIENTE", status: "ACTIVO", createdAt: new Date("2026-05-09T18:45:00.000Z") } }),
    db.user.create({ data: { id: "u-admin", name: "Admin Gamex", email: "admin@gamex.pe", passwordHash: placeholderHash, role: "ADMIN", status: "ACTIVO", createdAt: new Date("2025-12-01T08:00:00.000Z") } }),
  ]);
  console.log(`  ${users.length} users`);

  // Orders
  await db.order.create({
    data: {
      id: "o-1", code: "GMX-100245", userId: "u-1", status: "ENVIADO",
      subtotalUSD: 788.9, shippingUSD: 0, totalUSD: 788.9,
      createdAt: new Date("2026-06-18T14:30:00.000Z"),
      items: {
        create: [
          { productId: "p-7", name: "MSI GeForce RTX 5070 Ventus 3X 12GB", sku: "PN:RTX5070-VENTUS3X", priceUSD: 649, quantity: 1 },
          { productId: "p-12", name: "Fuente Sharkoon Rebel P15 850W", sku: "PN:SHARKOON-REBELP15-850", priceUSD: 139.9, quantity: 1 },
        ],
      },
      shipping: {
        create: { fullName: "Brayan Vargas", phone: "+51 987 654 321", document: "70123456", region: "Lima", city: "Lima", address: "Av. Tecnología 1234, San Borja", reference: "Frente al parque" },
      },
    },
  });

  await db.order.create({
    data: {
      id: "o-2", code: "GMX-100231", userId: "u-1", status: "ENTREGADO",
      subtotalUSD: 493, shippingUSD: 8, totalUSD: 501,
      createdAt: new Date("2026-06-10T09:15:00.000Z"),
      items: {
        create: [
          { productId: "p-1", name: "Memoria 16GB DDR5 Corsair Vengeance 6000MHz", sku: "PN:CMK16GX5M1E6000Z36", priceUSD: 246.5, quantity: 2 },
        ],
      },
    },
  });

  await db.order.create({
    data: {
      id: "o-3", code: "GMX-100260", userId: "u-1", status: "PENDIENTE",
      subtotalUSD: 488, shippingUSD: 8, totalUSD: 496,
      createdAt: new Date("2026-06-22T17:45:00.000Z"),
      items: {
        create: [
          { productId: "p-16", name: 'Monitor MSI MAG 274QRF 27" 2K 180Hz', sku: "PN:MSI-MAG274QRF", priceUSD: 329, quantity: 1 },
          { productId: "p-17", name: "Teclado Corsair K70 RGB PRO", sku: "PN:CORSAIR-K70-RGB", priceUSD: 159, quantity: 1 },
        ],
      },
    },
  });

  // Orders for other users
  await db.order.create({
    data: {
      id: "o-4", code: "GMX-100218", userId: "u-2", status: "ENTREGADO",
      subtotalUSD: 329, shippingUSD: 0, totalUSD: 329,
      createdAt: new Date("2026-06-05T11:20:00.000Z"),
      items: {
        create: [
          { productId: "p-16", name: 'Monitor MSI MAG 274QRF 27" 2K 180Hz', sku: "PN:MSI-MAG274QRF", priceUSD: 329, quantity: 1 },
        ],
      },
    },
  });

  await db.order.create({
    data: {
      id: "o-5", code: "GMX-100205", userId: "u-3", status: "CANCELADO",
      subtotalUSD: 159, shippingUSD: 0, totalUSD: 159,
      createdAt: new Date("2026-06-02T19:05:00.000Z"),
      items: {
        create: [
          { productId: "p-17", name: "Teclado Corsair K70 RGB PRO", sku: "PN:CORSAIR-K70-RGB", priceUSD: 159, quantity: 1 },
        ],
      },
    },
  });

  await db.order.create({
    data: {
      id: "o-6", code: "GMX-100262", userId: "u-4", status: "ENTREGADO",
      subtotalUSD: 246.5, shippingUSD: 0, totalUSD: 246.5,
      createdAt: new Date("2026-06-23T08:40:00.000Z"),
      items: {
        create: [
          { productId: "p-1", name: "Memoria 16GB DDR5 Corsair Vengeance 6000MHz", sku: "PN:CMK16GX5M1E6000Z36", priceUSD: 246.5, quantity: 1 },
        ],
      },
    },
  });
  console.log("  6 orders");

  // Payments
  await db.payment.create({ data: { id: "pay-1", code: "PAY-50245", orderId: "o-1", method: "TARJETA", provider: "MANUAL", amountUSD: 788.9, status: "PAGADO", createdAt: new Date("2026-06-18T14:31:00.000Z") } });
  await db.payment.create({ data: { id: "pay-2", code: "PAY-50231", orderId: "o-2", method: "YAPE", provider: "MANUAL", amountUSD: 501, status: "PAGADO", createdAt: new Date("2026-06-10T09:16:00.000Z") } });
  await db.payment.create({ data: { id: "pay-3", code: "PAY-50260", orderId: "o-3", method: "TRANSFERENCIA", provider: "MANUAL", amountUSD: 496, status: "PENDIENTE", createdAt: new Date("2026-06-22T17:46:00.000Z") } });
  await db.payment.create({ data: { id: "pay-4", code: "PAY-50218", orderId: "o-4", method: "TARJETA", provider: "MANUAL", amountUSD: 329, status: "REEMBOLSADO", createdAt: new Date("2026-06-05T11:20:00.000Z") } });
  await db.payment.create({ data: { id: "pay-5", code: "PAY-50205", orderId: "o-5", method: "TARJETA", provider: "MANUAL", amountUSD: 159, status: "FALLIDO", createdAt: new Date("2026-06-02T19:05:00.000Z") } });
  await db.payment.create({ data: { id: "pay-6", code: "PAY-50262", orderId: "o-6", method: "YAPE", provider: "MANUAL", amountUSD: 246.5, status: "PAGADO", createdAt: new Date("2026-06-23T08:40:00.000Z") } });
  console.log("  6 payments");

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
