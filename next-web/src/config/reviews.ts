export interface Review {
  id: string;
  imageUrl: string;
  caption: string;
  customerName?: string;
  rating?: number;
  date?: string;
  verified?: boolean;
}

export const reviewsConfig = {
  hero: {
    title: "รีวิวหน้างานจากลูกค้า 789 TOOLS",
    subtitle: "ภาพรีวิวเหล่านี้คือความภูมิใจของเรา ขอบคุณช่างทุกท่านที่ไว้วางใจให้ 789 TOOLS เป็นส่วนหนึ่งในงานก่อสร้าง"
  },
  
  reviews: [
    {
      id: "rev-001",
      imageUrl: "/review-01.png",
      caption: "บริการไว ส่งถึงหน้างานจริง เครื่องพร้อมใช้งาน",
      customerName: "คุณสมชาย ใจดี",
      rating: 5,
      date: "15/11/2024",
      verified: true
    },
    {
      id: "rev-002",
      imageUrl: "/review-02.png",
      caption: "ประทับใจสุดๆเป็นกันเองมาก",
      customerName: "คุณมานี รักการก่อสร้าง",
      rating: 5,
      date: "10/11/2024",
      verified: true
    },
    {
      id: "rev-003",
      imageUrl: "/review-03.png",
      caption: "ทีมงานให้คำแนะนำดีมาก",
      customerName: "คุณวีระ ช่างมืออาชีพ",
      rating: 5,
      date: "05/11/2024",
      verified: true
    },
    {
      id: "rev-004",
      imageUrl: "/review-04.png",
      caption: "มั่นใจในบริการส่งจริง ได้รับของไวมาก",
      customerName: "คุณสมศักดิ์ ช่างประจำ",
      rating: 5,
      date: "01/11/2024",
      verified: true
    },
    {
      id: "rev-005",
      imageUrl: "/review-05.png",
      caption: "เครื่องมือคุณภาพดี ใช้งานได้ดีเยี่ยม",
      customerName: "คุณบุญมี รับเหมา",
      rating: 5,
      date: "28/10/2024",
      verified: true
    },
    {
      id: "rev-006",
      imageUrl: "/review-06.png",
      caption: "บริการเช่าสะดวก ราคายุติธรรม",
      customerName: "คุณประเสริฐ ช่างไม้",
      rating: 5,
      date: "25/10/2024",
      verified: true
    },
    {
      id: "rev-007",
      imageUrl: "/review-07.png",
      caption: "อะไหล่แท้ บริการซ่อมดีมาก",
      customerName: "คุณเกษม ช่างไฟฟ้า",
      rating: 5,
      date: "20/10/2024",
      verified: true
    },
    {
      id: "rev-008",
      imageUrl: "/review-08.png",
      caption: "ส่งของทันเวลา แพ็คดีมาก",
      customerName: "คุณสุริยา หัวหน้าทีม",
      rating: 5,
      date: "15/10/2024",
      verified: true
    }
  ] as Review[],
  
  pagination: {
    itemsPerPage: 6
  },
  
  cta: {
    title: "ต้องการสอบถามข้อมูลสินค้า?",
    subtitle: "โทรหาเราทันทีเพื่อรับคำปรึกษาจากทีมช่างมืออาชีพ!",
    buttonText: "ติดต่อเรา"
  }
};
