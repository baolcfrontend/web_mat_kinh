const urlserver = `http://localhost:3000`;
const tygia = 25000;
class CSan_Pham {
    id;
    name;
    price;
    salePrice;
    discountPercentage;
    img;
    description;
    quantity;
    code;
    width;
    lengthmm;
    glasses;
    color;
    category;
    dateAdded;
    constructor(id, name, price, salePrice, discountPercentage, img, description, quantity, code, width, lengthmm, glasses, color, category, dateAdded) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.salePrice = salePrice;
        this.discountPercentage = discountPercentage;
        this.img = img;
        this.description = description;
        this.quantity = quantity;
        this.code = code;
        this.width = width;
        this.lengthmm = lengthmm;
        this.glasses = glasses;
        this.color = color;
        this.category = category;
        this.dateAdded = dateAdded;
    }
    Phantramgiam() {
        return (100 * (this.price - this.salePrice) / this.price).toFixed(0) + "%";
    }
    giavnd() {
        return Number(this.price).toLocaleString("vi") + "VNĐ";
    }
    giakm() {
        return Number(this.salePrice).toLocaleString("vi") + "VNĐ";
    }
    giausd(tygia) {
        return Number(this.price / tygia).toFixed(0) + "USD";
    }
}
class CMatKinh extends CSan_Pham {
    image;
    chat_lieu;
    kich_thuoc;
    mo_ta;
    dac_diem_noi_bat;
    ung_dung;
    luu_y;
    kich_thuoc_trong_kinh;
    cau_kinh;
    chieu_dai_cang_kinh;
    constructor(id, name, price, salePrice, discountPercentage, img, description, quantity, code, width, lengthmm, glasses, color, category, dateAdded, image, chat_lieu, kich_thuoc, mo_ta, dac_diem_noi_bat, ung_dung, luu_y, kich_thuoc_trong_kinh, cau_kinh, chieu_dai_cang_kinh) {
        super(id, name, price, salePrice, discountPercentage, img, description, quantity, code, width, lengthmm, glasses, color, category, dateAdded);
        this.image = image;
        this.chat_lieu = chat_lieu;
        this.kich_thuoc = kich_thuoc;
        this.mo_ta = mo_ta;
        this.dac_diem_noi_bat = dac_diem_noi_bat;
        this.ung_dung = ung_dung;
        this.luu_y = luu_y;
        this.kich_thuoc_trong_kinh = kich_thuoc_trong_kinh;
        this.cau_kinh = cau_kinh;
        this.chieu_dai_cang_kinh = chieu_dai_cang_kinh;
    }
}
export const lay_danh_muc_MN = async () => {
    let data = await fetch(urlserver + "/category").then(res => res.json()).then(data => data);
    let str = ``;
    data.forEach(danhmuc => {
        str += `<li><a href="/client/view/layout_user/product_or_cate.html?id=${danhmuc.id}">${danhmuc.name}</a></li> `;
    });
    return str;
};
export const lay_danh_muc = async () => {
    try {
        let data = await fetch(urlserver + "/category").then(res => res.json());
        let str = `<h2>BỘ SƯU TẬP MỚI NHẤT</h2>`;
        data.forEach(danhmuc => {
            str += `<li><a href="/client/view/layout_user/product_or_cate.html?id=${danhmuc.id}">${danhmuc.name}</a></li>`;
        });
        str += `<li><a href="">Xem Tất Cả</a></li>`;
        return str;
    }
    catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
        return "<p>Không thể tải danh mục.</p>";
    }
};
export const layspmoi = async (sosp = 10) => {
    let data = await fetch(urlserver + `/product/?_sort=-dateAdded&limit=${sosp}`).then(res => res.json()).then(data => data);
    let str = ``;
    data.forEach(sp => str += motsp(sp));
    str += `${str} `;
    return str;
};
export const motsp = (sp) => {
    let { id, name, price, salePrice, discountPercentage, img, description, quantity, code, width, lenght, glasser, color, category, dateAdded } = sp;
    let obj;
    obj = new CSan_Pham(id, name, price, salePrice, discountPercentage, img, description, quantity, code, width, lenght, glasser, color, category, dateAdded);
    const isFullDiscount = parseFloat(obj.Phantramgiam()) === 100;
    return `   
    <div class="product">
                <a href="/client/view/layout_user/page_detail.html?id=${sp.id}"><img src="/client/public/img/${obj.img}" alt=""></a>
                <div class="content-product">
                    <h3>${obj.name}</h3>
                    <div class="circle-container">
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle plus">+2</div>
                    </div>
                    <button>
                        ${obj.giavnd()}<i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
                </a>
                ${isFullDiscount
        ? ''
        : `
                <svg class="sale" width="150" height="150" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <!-- Tam giác -->
                    <path d="M 0 0 L 100 0 Q 10 30 0 100 Z" fill="red" />
                    <!-- Thêm chữ SALE -->
                    <text x="15" y="30" fill="white" font-size="15" font-family="Arial" font-weight="bold"
                        transform="rotate(-45, 30, 30)">
                        ${obj.Phantramgiam()}
                    </text>
                </svg>
                `}
   </div>
    `;
};
export const layspkm = async (sospkm = 8) => {
    let data = await fetch(`${urlserver}/product/?salePrice_ne=0&_sort=-dateAdded&_limit=${sospkm}`)
        .then(res => res.json())
        .then(data => data);
    let str = ``;
    data.forEach(spkm => {
        if (spkm.salePrice && parseFloat(spkm.salePrice) > 0) {
            str += motspkm(spkm);
        }
    });
    return str;
};
export const motspkm = (spkm) => {
    let { id, name, price, salePrice, discountPercentage, img, description, quantity, code, width, lenght, glasser, color, category, dateAdded } = spkm;
    let showspkm = new CSan_Pham(id, name, price, salePrice, discountPercentage, img, description, quantity, code, width, lenght, glasser, color, category, dateAdded);
    const isDiscounted = parseFloat(salePrice) > 0;
    return `
        <div class="products">
            <a href="/client/view/layout_user/page_detail.html?id=${spkm.id}">
                <img src="/client/public/img/${showspkm.img}" alt="">
            </a>
            <div class="content-product">
                <h3>${showspkm.name}</h3>
                <div class="circle-container">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle plus">+2</div>
                </div>
                <button>
                    ${showspkm.giavnd()}<i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
            ${isDiscounted
        ? `<svg class="sale" width="150" height="150" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <!-- Tam giác -->
                        <path d="M 0 0 L 100 0 Q 10 30 0 100 Z" fill="red" />
                        <!-- Thêm chữ SALE -->
                        <text x="15" y="30" fill="white" font-size="15" font-family="Arial" font-weight="bold"
                            transform="rotate(-45, 30, 30)">
                            ${showspkm.Phantramgiam()}
                        </text>
                    </svg>`
        : ''}
        </div>
    `;
};
export const layallsp = async (soallsp = 9) => {
    console.log("Limit:", soallsp);
    let data = await fetch(urlserver + `/product/?_sort=-dateAdded&limit=${soallsp}`).then(res => res.json());
    let str = ``;
    data.forEach(allsp => str += Lay_all_san_pham(allsp));
    return str;
};
export const Lay_all_san_pham = (allsp) => {
    const showallsp = new CSan_Pham(allsp.id, allsp.name, allsp.price, allsp.salePrice, allsp.discountPercentage, allsp.img, allsp.description, allsp.quantity, allsp.code, allsp.width, allsp.lengthmm, allsp.glasses, allsp.color, allsp.category, allsp.dateAdded);
    const isFullDiscount = parseFloat(showallsp.Phantramgiam()) === 100;
    return `
        <div class="products">
            <a href="/client/view/layout_user/page_detail.html?id=${showallsp.id}">
                <img src="/client/public/img/${showallsp.img}" alt="">
            </a>
            <div class="content-product">
                <h3>${showallsp.name}</h3>
                <div class="circle-container">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle plus">+2</div>
                </div>
                <button>
                    ${showallsp.giavnd()}<i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
            ${isFullDiscount ? '' : `
                <svg class="sale" width="150" height="150" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0 0 L 100 0 Q 10 30 0 100 Z" fill="red" />
                    <text x="15" y="30" fill="white" font-size="15" font-family="Arial" font-weight="bold"
                        transform="rotate(-45, 30, 30)">
                        ${showallsp.Phantramgiam()}
                    </text>
                </svg>
            `}
        </div>
    `;
};
export const lay_sp_or_dm = async (id_danhmuc, sosp = 6) => {
    let data = await fetch(urlserver + `/product/?category=${id_danhmuc}&_sort=-dateAdded&limit=${sosp}`).then(r => r.json()).then(d => d);
    let str = ``;
    data.forEach(sp => str += motspkm(sp));
    str = ` 
            ${str}   
 `;
    console.log(urlserver + `/product/?category=${id_danhmuc}&_sort=-dateAdded&limit=${sosp}`);
    return str;
};
export const lay1sp = async (id = 0) => {
    let sp = await fetch(urlserver + `/product/?id=${id}`).then(res => res.json()).then(data => data[0]);
    let tt = await fetch(urlserver + `/thuoc_tinh/?id_sp=${id}`).then(res => res.json()).then(d => d[0]);
    let { name, price, salePrice, discountPercentage, img, description, quantity, code, width, lengthmm, glasses, color, category, dateAdded } = sp;
    let { chat_lieu, kich_thuoc, mo_ta, dac_diem_noi_bat, ung_dung, luu_y, image, kich_thuoc_trong_kinh, cau_kinh, chieu_dai_cang_kinh } = tt;
    let obj = new CMatKinh(id, name, price, salePrice, discountPercentage, img, description, quantity, code, width, lengthmm, glasses, color, category, dateAdded, kich_thuoc, mo_ta, chat_lieu, ung_dung, dac_diem_noi_bat, luu_y, image, kich_thuoc_trong_kinh, cau_kinh, chieu_dai_cang_kinh);
    const thumbnails = Array.isArray(image) ? image.map(img => `<img src="/client/public/img/${img}" onclick="changeImage('/client/public/img/${img}')" alt="Thumbnail" />`).join('') : '';
    let str = `
  <div class="product-container">
    <div class="product-image">
      <img id="main-image" src="/client/public/img/${obj.img}" alt="${obj.name}" />
      <div class="thumbnail-container">
        ${thumbnails}
      </div>
    </div>
    <div class="product-details">
      <h1>${obj.name}</h1>
      <p class="product-code">Mã sản phẩm: ${obj.code}</p>
      <p class="product-code">Sản phẩm còn: ${obj.quantity}</p>
      <p class="price">
        <span class="sale-price">Giá Góc: ${obj.giavnd()}</span>
      </p>
      <p class="total-price">Giá Giảm: <span>${obj.giakm()}</span> 
        ${discountPercentage ? `<span class="sale-price">| Giảm ${discountPercentage}</span>` : ''}
      </p>
      <div class="color-options">
        <label for="colors">Màu Sắc:</label>
        <select id="colors">
          ${Array.isArray(color) ? color.map(c => `<option value="${c}">${c}</option>`).join('') : ''}
        </select>
      </div>
      <div class="quantity">
        <label for="quantity">Số lượng:</label>
        <button id="decrease">-</button>
        <input id="quantity" value="1" min="1" />
        <button id="increase">+</button>
        <button class="add-to-cart">Thêm vào giỏ</button>
      </div>
    </div>
  </div>
  `;
    str += `
  <div class="mota">
    <h3 onclick="toggleDescription()">
      Thông tin <i class="fa-solid fa-plus" id="toggle-icon"></i>
    </h3>
    <div class="description-content" id="description">
      <h7><strong>Tên sản phẩm:</strong> ${obj.name}</h7><br>
      <h7><strong>Mã sản phẩm:</strong> ${obj.code}</h7><br>
      <h7><strong>Mô tả:</strong> ${obj.description}</h7><br>
      <h7><strong>Kích thước:</strong> ${obj.width}mm * ${obj.lengthmm}mm</h7>
      <ul>
        <li>Chiều rộng tròng kính: ${obj.kich_thuoc_trong_kinh}</li>
        <li>Cầu kính: ${obj.cau_kinh}</li>
        <li>Chiều dài càng kính: ${obj.chieu_dai_cang_kinh}</li>
      </ul>
      <h7><strong>Đặc điểm nổi bật:</strong> ${obj.dac_diem_noi_bat}</h7><br>
      <h7><strong>Ứng dụng:</strong> ${obj.ung_dung}</h7><br>
      <h7><strong>Lưu ý khi sử dụng:</strong></h7>
      <ul>
        ${tt.luu_y.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  </div>
  <br>
  `;
    str += `
  <div class="mota">
    <h3>Vận chuyển - Đổi trả</h3>
    <br>
    <h7>Thời gian giao hàng dao động từ 2-4 ngày đối với đơn gọng kính, 3-5 ngày đối với đơn cắt cận.</h7><br>
    <h7>1. Bảo hành 1 đổi 1 trong 180 ngày sau khi mua hàng...</h7><br>
    <h7>2. Anna bảo hành cho cả lỗi người dùng nếu không may làm gẫy hoặc mất kính...</h7>
  </div>
  `;
    str += `
  <br>
  <div class="product-review">
    <h3>Đánh giá sản phẩm</h3>
    <form id="reviewForm">
      <label for="rating">Đánh giá (1-5):</label>
      <select id="rating" required>
        <option value="">Chọn số sao</option>
        <option value="1">⭐</option>
        <option value="2">⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="5">⭐⭐⭐⭐⭐</option>
      </select>
      <br>
      <label for="reviewText">Nhận xét:</label>
      <textarea id="reviewText" rows="4" placeholder="Viết đánh giá của bạn" required></textarea><br>
      <button type="submit">Gửi đánh giá</button>
    </form>
    <div class="reviews-list">
      <h4>Đánh giá từ khách hàng <i class="fa-solid fa-plus"></i></h4>
      <ul id="reviewsContainer"></ul>
    </div>
  </div>
  `;
    return str;
};
