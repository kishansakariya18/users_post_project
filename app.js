const express = require("express");
const { createPool } = require("mysql");
const CryptoJS = require('crypto-js');
const app = express();


app.locals.showErrror = () => {
     if (req.body.user_id == 1) {
      return  `<div class="alert alert-warning" role="alert">
      Oops !!!!! You Can Not comment on your post.
    </div>`
    }
  
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

//connect with DB
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "Kishan@1233",
  database: "task",
  connectionLimit: 10,
});

app.get("/users", async (req, res) => {
  pool.query(`SELECT * FROM USERS`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      return res.render("user_list.ejs", { data: result });
    }
  });
});

app.get("/users/posts", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!

    // Use the connection
    pool.query(
      `SELECT U.USERNAME username ,p.post_id ,u.user_id , P.POST post FROM USERS U INNER JOIN POSTS P ON U.USER_ID = P.USER_ID`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
           result.message = "you can not comment"
           console.log("Result is ",result[0].user_id);
          return res.render("index.ejs", { data: result  });
        }
      }
    );
  });
});

app.post(
  "/comments",
  (req, res) => {
    console.log("Request body is" ,req.body);
    console.log("Encrypted post_id is",req.body.post_id)
    let encvar = req.body.post_id;
    const decryptValue = (encryptedValue)=> {
      return atob(encryptedValue)
    }

    const dec_post_id = decryptValue(encvar)
    console.log(dec_post_id);


    if (req.body.user_id == 1) {
      res.json({message: "data sent"})
    } else {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        // Use the connection
        connection.query(
          "INSERT INTO comments SET comment = ? , post_id = ?",
          [req.body.comment , dec_post_id],
          (error, results) => {
            // When done with the connection, release it.
            connection.release();

            // Handle error after the release.
            if (error) throw error;
            console.log("comment is ", req.body.comment);
            return res.redirect("/users/posts");

            // Don't use the connection here, it has been returned to the pool.
          }
        );
      });
    }

  }

);

app.get("/", (req, res) => {
  return res.send("This is homepage");
});

app.listen(4000, () => {
  console.log("server listing");
});
