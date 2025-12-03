# Fashion 21

A full-stack online fashion store where users can explore trendy outfits, details of the product and can add their favourite items to the cart or to the wishlist. Users can manage their address easily. .
Built with React, Node.js/Express, MongoDB .

---
## Demo Link

[Live Demo] (https://ecommerce-app-frontend-liard.vercel.app/)

---
## Quick Start

```
git clone https://github.com/sumairahkanwal13/Ecommerce-app-frontend.git
cd Project1-Frontend
npm install
npm start
```

---

## Technologies

- React JS
- React Router
- Node.js
- Express
- MongoDB
- Bootstrap

---

## Demo Video
Watch a walkthrought (9:34 minutes) of all the major features of this app:
[Video Link] (https://drive.google.com/file/d/13n4B_KmhgFVI2FcFex9Ooce42nxueST6/view?usp=sharing)

---

## Features
**Home**

- Displays all categories
- Search products by title in real time


**Product List**

- Display list of all products fetched from backend API.
- Show different filter so user can narrow results
- Edit button for editing the existing lead if needed
- View Details and Add to Wishlist links are also available

**Product View Details**

- Display details of the product
- Show product's detailed description with size selector



---
## Api Reference

### **Get/api/products/**<br>
Fetch all products<br>
Sample response<br>
```
[
  {
    "_id": "...",
    "title": "Product Name",
    "price": 199,
    "category": { "_id": "...", "name": "Electronics" }
  }
]

```

### **POST /api/products/**<br>
Create a product<br>
Sample response<br>
```
{
  "title": "Flooral Maxi Dress",
  "description": "Details",
  "price": 100,
  "category": "women"
}


```

### **Get /api/categories/**<br>
Fetch all categories<br>
Sample response<br>
```
[
  { "_id": "...", "name": "Men's Denim Jacket" }
]

```

### **POST /api/categories/**<br>
Create a category<br>
Sample response<br>
```
{
  "message": "Category added successfully.",
  "data": { "_id": "...", "name": "Electronics" }
}
```

---
## Contact
For bugs or features request, please reach out to sumairahkanwal33@gmail.com 