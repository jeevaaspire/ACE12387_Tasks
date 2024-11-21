create database plsql;

use plsql;

create table products(
	product_id int(3) not null,
     product_name varchar(50) not null,
	product_qty int(3) not null,
	product_price float(4) not null
 );

select * from products;

insert into products values(2,"charger",2,30000.00),(3,"dryer",1,45000);

alter table products drop primary key;
alter table products modify product_id int(3) primary key;

update products set product_qty=5 where product_name="laptop";

drop table products;

delete from products where product_name="laptop";

rollback;


	SELECT 'This is the messsage...' as Task123;

DELIMITER $$
CREATE PROCEDURE getProductDetails(IN productID int)
BEGIN
	SELECT * from products where product_id > productID;
END $$

DELIMITER ;

drop procedure getProductDetails;

CALL getProductDetails(1); 

DELIMITER $$
CREATE FUNCTION getProductPrice(price int)
RETURNS varchar(10)
DETERMINISTIC
BEGIN 
 DECLARE product varchar(10);
 SELECT product_name into product from products where product_price > price;
 RETURN product;
END $$
DELIMITER ;

drop function getProductPrice;



SELECT getProductPrice(20000);

select * from products;

drop procedure getProductDetails;


