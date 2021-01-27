### An complete rest api built for ecommerce-server
    
### NestJs:
    
#### https://docs.nestjs.com
    
    NestJs is a framework to build scalable nodejs applications.

    Introduction:

    This is a platform for small retailers to bring their shop on cloud so that they 
    can have competitive edge over ecommerce-platforms.

    Each retailer when registers can add their shops But they can only sell when admin
    set 'can_sell' property of 'shop' to 'true'.

    Otherwise retailer have full control over their shop.They decide wheteher it is 'online'
    or 'offline' base on the value of property 'status' of 'shop'

    
#### Features:
    
    Authentication using google and redirect to home page on successfull login
    User can change his password
    User can register and view his profile and see which shops has granted him exclusive status.
    User can search shops by 'type' and 'category'.
    Retailer can register and add shop.
    Shop can only sell if admin set 'can_sell' property of shop to 'True'.
    Shop can add categories and products in them (also set shop 'status' to 'offline'/'online'.
    Admin can do anything :)).
    
    Features you should implement:
    User can add to cart and buy products
    
    Help:
    
    For using sessions in NestJs:   
    https://dev.to/nestjs/authentication-and-sessions-for-mvc-apps-with-nestjs-55a4

    
    
