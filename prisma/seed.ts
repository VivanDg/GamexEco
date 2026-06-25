import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

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
