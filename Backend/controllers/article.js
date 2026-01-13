const pool = require('../config/connection');
const multer = require('multer');

// إعداد التخزين للصورة
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// جلب جميع المقالات
const getAllArticles = (req, res) => {
    pool.query(
        'SELECT * FROM article',
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'حدث خطأ' });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "لا يوجد مقالات" });
            }
            res.json(results);
        }
    );
};

// إضافة مقالة جديدة
const addNewArticle = (req, res) => {
    const { title, content, metadescription, metakeywords, slug, status } = req.body;

    // تحويل المصفوفة إلى JSON أو نص مفصول بفواصل
    const keywords = Array.isArray(metakeywords) ? metakeywords.join(",") : metakeywords;

    // مسار الصورة في حال تم رفعها
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    pool.query(
        'INSERT INTO article (title, content, photo, metadescription, metakeywords, slug, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [title, content, photo, metadescription, keywords, slug, status, new Date()],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'حدث خطأ أثناء إنشاء المقال' });
            }
            res.status(200).json({ message: 'تم إضافة المقال بنجاح', data: results });
        }
    );
};

const getArticle = (req,res)=>{
        const slug = req.params.slug;
    pool.query(
        'select * from article where slug = ?',
        [slug],
        (err , results)=>{
            if(err){
                return res.status(500).json({message:"حدث خطأ اثناء جلب البيانات"})
            }
            if(results.length === 0){
                return res.status(404).json({message : "المقالة غير موجودة"})
            }
            return res.status(200).json(results);

        }
    )
}

//تحديث المقالة
const updateArticle = (req, res) => {
    const Articleslug = req.params.slug;
    const { title, content, metadescription, metakeywords, slug, status } = req.body;

    // تحويل المصفوفة إلى نص مفصول بفواصل إذا كانت Array
    const keywords = Array.isArray(metakeywords) ? metakeywords.join(",") : metakeywords;

    // مسار الصورة في حال تم رفعها
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    // جملة التحديث
    const query = `
        UPDATE article 
        SET title = ?, 
            content = ?, 
            ${photo ? 'photo = ?,' : ''} 
            metadescription = ?, 
            metakeywords = ?, 
            slug = ?, 
            status = ? 
        WHERE slug = ?
    `;

    // ترتيب القيم حسب ترتيب الـ "?" في الاستعلام
    const values = photo
        ? [title, content, photo, metadescription, keywords, slug, status, Articleslug]
        : [title, content, metadescription, keywords, slug, status, Articleslug];

    // هنا تم تمرير القيم بشكل صحيح
    pool.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'حدث خطأ أثناء تحديث المقال' });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'لم يتم العثور على المقال لتحديثه' });
        }
        
        res.status(200).json({ message: 'تم تحديث المقال بنجاح', data: results });
    });
};

const deleteArticle = (req, res) => {
    try {
        const Articleslug = req.params.slug;
        
        if (!Articleslug) {
            return res.status(400).json({message: "يجب تحديد معرف المقالة"});
        }

        pool.query('DELETE FROM article WHERE slug = ?', 
            [Articleslug],
            (err, results) => {
                if (err) {
                    console.error('خطأ في قاعدة البيانات:', err);
                    return res.status(500).json({message: "حدث خطأ في الخادم أثناء حذف المقالة"});
                }
                
                if (results.affectedRows === 0) {
                    return res.status(404).json({message: "لم يتم العثور على المقالة"});
                }
                
                return res.status(200).json({message: "تم حذف المقالة بنجاح"});
            }
        );
    } catch (error) {
        console.error('خطأ غير متوقع:', error);
        return res.status(500).json({message: "حدث خطأ غير متوقع"});
    }
}



module.exports = {
    getAllArticles,
    addNewArticle,
    upload,
    getArticle,
    updateArticle,
    deleteArticle
};
