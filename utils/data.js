import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'John',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: 'Jane',
            email: 'user@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        },
    ],
    products: [
        {
            name: 'Free Shirt',
            slug: 'free-shirt',
            category: 'Shirts',
            breadcrumbs: [
                { id: 1, name: 'Men', href: '#' },
                { id: 2, name: 'Clothing', href: '#' },
            ],
            images: [
                {
                    src: '/images/shirt1.jpg',
                    alt: ""
                }
            ],
            colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-black', selectedClass: 'ring-gray-900' },
            ],
            sizes: [
                { name: 'XXS', inStock: false },
                { name: 'XS', inStock: true },
                { name: 'S', inStock: true },
                { name: 'M', inStock: true },
                { name: 'L', inStock: true },
                { name: 'XL', inStock: true },
                { name: '2XL', inStock: true },
                { name: '3XL', inStock: true },
            ],
            price: 70,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description:
                'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
            highlights: [
                'Hand cut and sewn locally',
                'Dyed with our proprietary colors',
                'Pre-washed & pre-shrunk',
                'Ultra-soft 100% cotton',
            ],
            details:
                'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
        },
        {
            name: 'Fit Shirt',
            slug: 'fit-shirt',
            category: 'Shirts',
            breadcrumbs: [
                { id: 1, name: 'Men', href: '#' },
                { id: 2, name: 'Clothing', href: '#' },
            ],
            images: [
                {
                    src: '/images/shirt2.jpg',
                    alt: ""
                }
            ],
            colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-black', selectedClass: 'ring-gray-900' },
            ],
            sizes: [
                { name: 'XXS', inStock: false },
                { name: 'XS', inStock: true },
                { name: 'S', inStock: true },
                { name: 'M', inStock: true },
                { name: 'L', inStock: true },
                { name: 'XL', inStock: true },
                { name: '2XL', inStock: true },
                { name: '3XL', inStock: true },
            ],
            price: 80,
            brand: 'Adidas',
            rating: 3.2,
            numReviews: 10,
            countInStock: 20,
            description:
                'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
            highlights: [
                'Hand cut and sewn locally',
                'Dyed with our proprietary colors',
                'Pre-washed & pre-shrunk',
                'Ultra-soft 100% cotton',
            ],
            details:
                'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
        },
        {
            name: 'Slim Shirt',
            slug: 'slim-shirt',
            category: 'Shirts',

            breadcrumbs: [
                { id: 1, name: 'Men', href: '#' },
                { id: 2, name: 'Clothing', href: '#' },
            ],
            images: [
                {
                    src: '/images/shirt3.jpg',
                    alt: ""
                }
            ],
            colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-black', selectedClass: 'ring-gray-900' },
            ],
            sizes: [
                { name: 'XXS', inStock: false },
                { name: 'XS', inStock: true },
                { name: 'S', inStock: true },
                { name: 'M', inStock: true },
                { name: 'L', inStock: true },
                { name: 'XL', inStock: true },
                { name: '2XL', inStock: true },
                { name: '3XL', inStock: true },
            ],
            price: 90,
            brand: 'Raymond',
            rating: 4.5,
            numReviews: 3,
            countInStock: 20,
            description:
                'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
            highlights: [
                'Hand cut and sewn locally',
                'Dyed with our proprietary colors',
                'Pre-washed & pre-shrunk',
                'Ultra-soft 100% cotton',
            ],
            details:
                'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
        },
        {
            name: 'Golf Pants',
            slug: 'golf-pants',
            category: 'Pants',
            breadcrumbs: [
                { id: 1, name: 'Men', href: '#' },
                { id: 2, name: 'Clothing', href: '#' },
            ],
            images: [
                {
                    src: '/images/pants1.jpg',
                    alt: ""
                }
            ],
            colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-black', selectedClass: 'ring-gray-900' },
            ],
            sizes: [
                { name: 'XXS', inStock: false },
                { name: 'XS', inStock: true },
                { name: 'S', inStock: true },
                { name: 'M', inStock: true },
                { name: 'L', inStock: true },
                { name: 'XL', inStock: true },
                { name: '2XL', inStock: true },
                { name: '3XL', inStock: true },
            ],
            price: 90,
            brand: 'Oliver',
            rating: 2.9,
            numReviews: 13,
            countInStock: 20,
            description:
                'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
            highlights: [
                'Hand cut and sewn locally',
                'Dyed with our proprietary colors',
                'Pre-washed & pre-shrunk',
                'Ultra-soft 100% cotton',
            ],
            details:
                'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
        },
        {
            name: 'Fit Pants',
            slug: 'fit-pants',
            category: 'Pants',

            breadcrumbs: [
                { id: 1, name: 'Men', href: '#' },
                { id: 2, name: 'Clothing', href: '#' },
            ],
            images: [
                {
                    src: '/images/pants2.jpg',
                    alt: ""
                }
            ],
            colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-black', selectedClass: 'ring-gray-900' },
            ],
            sizes: [
                { name: 'XXS', inStock: false },
                { name: 'XS', inStock: true },
                { name: 'S', inStock: true },
                { name: 'M', inStock: true },
                { name: 'L', inStock: true },
                { name: 'XL', inStock: true },
                { name: '2XL', inStock: true },
                { name: '3XL', inStock: true },
            ],
            price: 95,
            brand: 'Zara',
            rating: 3.5,
            numReviews: 7,
            countInStock: 20,
            description:
                'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
            highlights: [
                'Hand cut and sewn locally',
                'Dyed with our proprietary colors',
                'Pre-washed & pre-shrunk',
                'Ultra-soft 100% cotton',
            ],
            details:
                'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
        },
        {
            name: 'Classic Pants',
            slug: 'classic-pants',
            category: 'Pants',
            breadcrumbs: [
                { id: 1, name: 'Men', href: '#' },
                { id: 2, name: 'Clothing', href: '#' },
            ],
            images: [
                {
                    src: '/images/pants3.jpg',
                    alt: ""
                }
            ],
            colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-black', selectedClass: 'ring-gray-900' },
            ],
            sizes: [
                { name: 'XXS', inStock: false },
                { name: 'XS', inStock: true },
                { name: 'S', inStock: true },
                { name: 'M', inStock: true },
                { name: 'L', inStock: true },
                { name: 'XL', inStock: true },
                { name: '2XL', inStock: true },
                { name: '3XL', inStock: true },
            ],
            price: 75,
            brand: 'Casely',
            rating: 2.4,
            numReviews: 14,
            countInStock: 20,
            description:
                'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
            highlights: [
                'Hand cut and sewn locally',
                'Dyed with our proprietary colors',
                'Pre-washed & pre-shrunk',
                'Ultra-soft 100% cotton',
            ],
            details:
                'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
        },
    ],
}

export default data;