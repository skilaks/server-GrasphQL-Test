 const data = {
    products: [{
        id: '1',
        title: "Acer Predator Helios 300 Gaming Laptop",
        price: "$1,349.98",
        pic:
            "https://images-na.ssl-images-amazon.com/images/I/71bRl4ymGDL._AC_SX425_.jpg",
        desc: `9th Generation Intel Core i7-9750H 6-Core Processor (Upto 4. 5 gramHz) with Windows 10 Home 64 Bit
          NVIDIA GeForce GTX 1660 Ti Graphics with 6 GB of dedicated GDDR6 VRAM
          15. 6" Full HD (1920 x 1080) Widescreen LED-backlit IPS display (144Hz Refresh Rate, 3ms Overdrive Response Time, 300nit Brightness & 72% NTSC)
          16 GB DDR4 2666MHz Memory, 512GB PCIe NVMe SSD (2 x PCIe M. 2 Slots | 1 Slot Open for Easy Upgrades) & 1 - Available Hard Drive Bay
          Backlit Keyboard | LAN: Killer Gaming Network E2500 | Wireless: Killer DoubleShot Pro Wireless-AX 1650 WiFi 6 802. 11ac | 4th Gen All-Metal AeroBlade 3D Fan`,
        comments: [
            {author: 'Jennifer', text: `Parents bought this for my sister and this is perfect for her to start on it's good for light-medium gaming. With school converting to online it's perfect as well. This computer also has good battery life away from the charger while might use with heavy use not so much it's good though. Overall the computer is good for it's current price and an amazing deal.`},
            {author: 'Kimberly Engel', text: 'Absolutely amazing laptop! Runs games with zero lag. I was lucky to get it for $579, and would recommend checking this frequently as it goes super fast at that price.'}
        ]
    },
        {
            id: 2,
            title: 'Xiaomi Redmi 8 64GB, 4GB RAM, 6.53" Full HD ',
            price: '$ 150.00',
            pic: " https://images-na.ssl-images-amazon.com/images/I/61ZOje2k9pL._AC_SL1000_.jpg",
            desc: `LTE: B1/3/7/8/20/28/38/40 > (ensure to check compatibility with your carrier before purchase)
    (6.67) FHD+ Resolution DotDisplay 2400 x 1080 FHD+ - Triple Corning Gorilla Glass 5 - Anti-oil and anti-fingerprint protective coating
    6GB RAM + 64GB, microSD expandable up to 512GB - Qualcomm Snapdragon 720G - 5020 mAh (typical) Li Polymer Built-in rechargeable battery - Supports 2.4G Wi-Fi / 5G Wi-Fi - Side-Mounted Fingerprint Sensor`,
    comments: [
        {author: 'Jennifer', text: `Parents bought this for my sister and this is perfect for her to start on it's good for light-medium gaming. With school converting to online it's perfect as well. This computer also has good battery life away from the charger while might use with heavy use not so much it's good though. Overall the computer is good for it's current price and an amazing deal.`},
        {author: 'Kimberly Engel', text: 'Absolutely amazing laptop! Runs games with zero lag. I was lucky to get it for $579, and would recommend checking this frequently as it goes super fast at that price.'}
    ]
        }, {
            id: 3,
            title: 'Samsung Galaxy S10+ Factory Unlocked Android Cell Phone',
            price: '$ 234.98',
            pic: " https://images-na.ssl-images-amazon.com/images/I/61lSf9P2WTL._AC_SL1500_.jpg",
            desc: `Updated Camera Features: Get the more powerful S10 with a software update that gives you all new features including Single Take AI, Pro Video and more
        High-quality camera lenses: With a full set of pro lenses, including ultrawide for stunning landscapes and micro-zoom for epic details, Galaxy S10+ is a studio in your pocket, featuring live video bokeh, precision audio focus and super-stabilization`
        }, {
            id: 4,
            title: 'Samsung Galaxy A51 (SM-A515F/DS) Dual SIM 128GB',
            price: '$ 279.99',
            pic: " https://images-na.ssl-images-amazon.com/images/I/61-9jlsrsjL._AC_SL1000_.jpg",
            desc: `Display: 6.5 inches Super AMOLED capacitive touchscreen w/ Corning Gorilla Glass 3 - Resolution: 1080 x 2400 pixels
        Main Camera (Quad): 48 MP + 12 MP + 5 MP + 5 MP w/ LED flash, panorama, HDR - Selfie Camera: 32 MP w/ HDR`
        },{
            id: 5,
            title: 'Samsung Galaxy A31-128GB / 4GB - A315G/DSL Unlocked Dual sim',
            price: '$ 219.99s',
            pic: " https://images-na.ssl-images-amazon.com/images/I/61au3iYiqXL._AC_SL1000_.jpg",
            desc: `Display: 6.5 inches Super AMOLED capacitive touchscreen w/ Corning Gorilla Glass 3 - Resolution: 1080 x 2400 pixels
        Main Camera (Quad): 48 MP + 12 MP + 5 MP + 5 MP w/ LED flash, panorama, HDR - Selfie Camera: 32 MP w/ HDR`
        },{
            id: 6,
            title: 'Samsung Galaxy A71 (SM-A715F/DS) Dual SIM 4G LTE 128GB',
            price: '$ 368.99',
            pic: " https://images-na.ssl-images-amazon.com/images/I/61COIQCUxIL._AC_SL1500_.jpg",
            desc: `Display: 6.5 inches Super AMOLED capacitive touchscreen w/ Corning Gorilla Glass 3 - Resolution: 1080 x 2400 pixels
        Main Camera (Quad): 48 MP + 12 MP + 5 MP + 5 MP w/ LED flash, panorama, HDR - Selfie Camera: 32 MP w/ HDR`
        }]
}

 const ProductService = {
     getProductById :(id)=>{

         return data.products.find(item => item.id.toString() === id.toString())
     }
     ,getProducts:()=>{
         return data.products.slice();
     }
 }

 module.exports = ProductService;