const Campground = require('../models/campground');

module.exports.index=(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
})

module.exports.renderNewForm= (req, res) => {
   
    res.render('campgrounds/new');
}
module.exports.createCampground= async (req, res, next) => {
     const campground = new Campground(req.body.campground);
    campground.images=req.files.map(f=>({url:f.path, filename: f.filename}));
     campground.author = req.user._id;
    await campground.save();
    console.log(campground.images);
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}
module.exports.showCampground=async (req, res,) => {
    const campground = await Campground.findById(req.params.id).populate({
        path:"reviews",
        populate:{
            path:"author"
        }
    }).populate('author');
    
    if(!campground){
        req.flash('error','Cannot find that campground');
        return res.redirect('/campgrounds')
    }
       res.render('campgrounds/show', { campground }); ///z
}

module.exports.renderEditForm=async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    
    res.render('campgrounds/edit', { campground });
}
module.exports.updateCampgrounds=async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    const camp = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs=req.files.map(f=>({url:f.path, filename: f.filename}));
    campground.images.push(...imgs);
    await campground.save();
    req.flash('success','Successfully updated a campground')
    res.redirect(`/campgrounds/${campground._id}`) /////UPDATE
}

module.exports.deleteCampground=async (req, res) => {
    const { id } = req.params; 
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    await Campground.findByIdAndDelete(id);////////DELETE
    req.flash('success','Successfully deleted a campground.')
    res.redirect('/campgrounds');
}