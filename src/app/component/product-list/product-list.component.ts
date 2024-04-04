import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  isLoggedIn = false;
  productArray: any = [];
  cartItemArray: any = [];
  wishListItemArray: any = [];

  constructor(
    public router: Router,
    private ProductService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private auth: AuthService
  ) {
    this.isLoggedIn = this.auth.getAuthStatus();
  }

  showLoader = false;
  ngOnInit() {
    this.fetchProducts();
    this.cartItemProductsIds();
    this.wishlistItemsProductIds();
    this.getAllCategories();
  }

  showPage: any = 0;
  paginationArray: any = [];

  categoriesArray: any = [];

  getPageNumbers() {
    this.showPage = 1;
    const pageCount = this.pagination?.pageCount || 0;
    this.paginationArray = Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  goToPage(pageNumber: number): void {
    if (this.showPage != pageNumber) {
      this.showPage = pageNumber;
      this.selectedCategory = -1;
      this.fetchProducts(pageNumber);
    }
  }
  cartItemProductsIds() {
    this.cartService.getCartItems().subscribe({
      next: (response) => {
        let tempArr = response.data;
        tempArr.forEach((item: any) =>
          this.cartItemArray.push(item.attributes.product.data.id)
        );
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
      },
    });
  }

  selectedCategory: any = '-1';
  changePagination = false;
  onCategoryChange() {
    this.searchValue = '';
    this.changePagination = true;
    if (this.selectedCategory == -1) {
      this.fetchProducts();
    } else {
      this.fetchProducts(0, this.selectedCategory);
    }
  }

  getAllCategories() {
    this.ProductService.getAllCategories().subscribe({
      next: (response: any) => {
        this.categoriesArray = response.data;
        this.categoriesArray = this.categoriesArray.map((category: any) => {
          return {
            id: category.id,
            name: category.attributes.category_name,
          };
        });

        console.log(this.categoriesArray);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  wishlistItemsProductIds() {
    this.wishlistService.getWishlist().subscribe({
      next: (response) => {
        let tempArr = response.data;
        tempArr.forEach((item: any) =>
          this.wishListItemArray.push(item.attributes.product.data.id)
        );
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
      },
    });
  }

  searchValue: any = '';
  isEmpty = true;
  searchProduct() {
    this.changePagination = true;
    this.selectedCategory = '-1';
    if (this.searchValue) {
      this.fetchProducts(0, '', this.searchValue);
      this.isEmpty = false;
    } else if (!this.isEmpty) {
      this.fetchProducts();
      this.isEmpty = true;
    }
  }

  login() {
    this.router.navigate(['/login']);
  }
  pagination: any = {};

  fetchProducts(page = 0, category = '', search = this.searchValue) {
    this.showLoader = true;
    this.ProductService.getProducts(page, category, search).subscribe({
      next: (response: any) => {
        setTimeout(() => (this.showLoader = false), 200);
        this.productArray = response.data;
        this.pagination = response.meta.pagination;

        if (this.changePagination) {
          this.getPageNumbers();
          this.changePagination = false;
        }
        if (!this.showPage) {
          this.getPageNumbers();
        }
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  addToCart(productId: number): void {
    this.cartService.addCart(productId).subscribe(
      (response: any) => {
        this.cartItemArray.push(productId);
      },
      (error: any) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }

  addToWishList(productId: number): void {
    this.wishlistService.addTOWishlist(productId).subscribe(
      (response: any) => {
        this.wishListItemArray.push(productId);
      },
      (error: any) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }
}
/* 
{
	"data": [
		{
			"id": 34,
			"attributes": {
				"product_name": "Gulab Powder 50 Gram",
				"price": 70,
				"product_description": "Dry Rose Flower Powder Gulab Powder 50 Gram • Treats Wounds",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 35,
			"attributes": {
				"product_name": "Plant Hanger For Home",
				"price": 41,
				"product_description": "Boho Decor Plant Hanger For Home Wall Decoration Macrame Wall Hanging Shelf",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 36,
			"attributes": {
				"product_name": "Flying Wooden Bird",
				"price": 51,
				"product_description": "Package Include 6 Birds with Adhesive Tape Shape: 3D Shaped Wooden Birds Material: Wooden MDF, Laminated 3.5mm",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 37,
			"attributes": {
				"product_name": "3D Embellishment Art Lamp",
				"price": 20,
				"product_description": "3D led lamp sticker Wall sticker 3d wall art light on/off button  cell operated (included)",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 38,
			"attributes": {
				"product_name": "Handcraft Chinese style",
				"price": 60,
				"product_description": "Handcraft Chinese style art luxury palace hotel villa mansion home decor ceramic vase with brass fruit plate",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 39,
			"attributes": {
				"product_name": "Key Holder",
				"price": 30,
				"product_description": "Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 40,
			"attributes": {
				"product_name": "Mornadi Velvet Bed",
				"price": 40,
				"product_description": "Mornadi Velvet Bed Base with Headboard Slats Support Classic Style Bedroom Furniture Bed Set",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 41,
			"attributes": {
				"product_name": "Sofa for Coffe Cafe",
				"price": 50,
				"product_description": "Ratttan Outdoor furniture Set Waterproof  Rattan Sofa for Coffe Cafe",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 42,
			"attributes": {
				"product_name": "3 Tier Corner Shelves",
				"price": 700,
				"product_description": "3 Tier Corner Shelves | 3 PCs Wall Mount Kitchen Shelf | Floating Bedroom Shelf",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 43,
			"attributes": {
				"product_name": "Plastic Table",
				"price": 50,
				"product_description": "V﻿ery good quality plastic table for multi purpose now in reasonable price",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 44,
			"attributes": {
				"product_name": "3 DOOR PORTABLE",
				"price": 41,
				"product_description": "Material: Stainless Steel and Fabric  Item Size: 110 cm x 45 cm x 175 cm Package Contents: 1 Storage Wardrobe",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 45,
			"attributes": {
				"product_name": "Sleeve Shirt Womens",
				"price": 90,
				"product_description": "Cotton Solid Color Professional Wear Sleeve Shirt Womens Work Blouses Wholesale Clothing Casual Plain Custom Top OEM Customized",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 46,
			"attributes": {
				"product_name": "ank Tops for Womens/Girls",
				"price": 50,
				"product_description": "PACK OF 3 CAMISOLES ,VERY COMFORTABLE SOFT COTTON STUFF, COMFORTABLE IN ALL FOUR SEASONS",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 47,
			"attributes": {
				"product_name": "sublimation plain kids tank",
				"price": 100,
				"product_description": "sublimation plain kids tank tops wholesale",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 48,
			"attributes": {
				"product_name": "Women Sweaters Wool",
				"price": 600,
				"product_description": "2021 Custom Winter Fall Zebra Knit Crop Top Women Sweaters Wool Mohair Cos Customize Crew Neck Women' S Crop Top Sweater",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 49,
			"attributes": {
				"product_name": "women winter clothes",
				"price": 57,
				"product_description": "women winter clothes thick fleece hoodie top with sweat pantjogger women sweatsuit set joggers pants two piece pants set",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 50,
			"attributes": {
				"product_name": "NIGHT SUIT",
				"price": 55,
				"product_description": "NIGHT SUIT RED MICKY MOUSE..  For Girls. Fantastic Suits.",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 51,
			"attributes": {
				"product_name": "Stiched Kurta plus trouser",
				"price": 80,
				"product_description": "FABRIC: LILEIN CHEST: 21 LENGHT: 37 TROUSER: (38) :ARABIC LILEIN",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 52,
			"attributes": {
				"product_name": "frock gold printed",
				"price": 600,
				"product_description": "Ghazi fabric long frock gold printed ready to wear stitched collection (G992)",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 53,
			"attributes": {
				"product_name": "Ladies Multicolored Dress",
				"price": 79,
				"product_description": "This classy shirt for women gives you a gorgeous look on everyday wear and specially for semi-casual wears.",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 54,
			"attributes": {
				"product_name": "Malai Maxi Dress",
				"price": 50,
				"product_description": "Ready to wear, Unique design according to modern standard fashion, Best fitting ,Imported stuff",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 55,
			"attributes": {
				"product_name": "women's shoes",
				"price": 40,
				"product_description": "Close: Lace, Style with bottom: Increased inside, Sole Material: Rubber",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 56,
			"attributes": {
				"product_name": "Sneaker shoes",
				"price": 120,
				"product_description": "Synthetic Leather Casual Sneaker shoes for Women/girls Sneakers For Women",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 57,
			"attributes": {
				"product_name": "Women Strip Heel",
				"price": 40,
				"product_description": "Features: Flip-flops, Mid Heel, Comfortable, Striped Heel, Antiskid, Striped",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		},
		{
			"id": 58,
			"attributes": {
				"product_name": "Chappals & Shoe Ladies Metallic",
				"price": 23,
				"product_description": "Womens Chappals & Shoe Ladies Metallic Tong Thong Sandal Flat Summer 2020 Maasai Sandals",
				"is_deleted": false,
				"manufacturer_company": null,
				"manufacture_date": null,
				"weight": null,
				"color": null,
				"expiration_date": null,
				"dimension": null,
				"createdAt": "2024-04-01T10:09:09.000Z",
				"updatedAt": "2024-04-01T10:09:09.000Z",
				"publishedAt": "2024-04-01T10:09:09.000Z"
			}
		}
	],
	"meta": {
		"pagination": {
			"page": 2,
			"pageSize": 25,
			"pageCount": 5,
			"total": 101
		}
	}
} */
