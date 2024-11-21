use plsql;

select * from products;

CREATE TABLE log(
	timelog datetime not null,
	product_message varchar(10) not null,
    product_count varchar(10) not null
);

ALTER TABLE log modify timelog datetime not null primary key;

DROP TABLE log;

INSERT INTO products VALUES(19,"NoteBook",4,3000);

DELIMITER &&
CREATE TRIGGER getNotify
AFTER INSERT ON products
FOR EACH ROW
BEGIN
	DECLARE getRecordCount int(10);
    DECLARE getProductName varchar(10);
    DECLARE getLogCount int(100);
    DECLARE prevtimelog datetime;
	SELECT count(*) INTO getRecordCount FROM products;
    SELECT count(*) INTO getLogCount FROM log;
    SELECT timelog INTO prevtimelog FROM log LIMIT 1;
    -- SELECT product_name INTO getProductName where 
    
    IF getLogCount=0 THEN	
		INSERT INTO log VALUES (NOW(),"failure",getRecordCount);
    ELSE 
		UPDATE log SET product_count=getRecordCount WHERE timelog=prevtimelog;
    END IF;
END &&
DELIMITER ;

DROP trigger getNotify;

SELECT * FROM log; 

