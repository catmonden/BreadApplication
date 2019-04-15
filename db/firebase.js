import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAoG-0V4r7eJsauSsOhfU-Gx0cduMTfQZc",
  authDomain: "juniordesign-afa7c.firebaseapp.com",
  databaseURL: "https://juniordesign-afa7c.firebaseio.com",
  projectId: "juniordesign-afa7c",
  storageBucket: "juniordesign-afa7c.appspot.com",
  messagingSenderId: "199705549356"
};

firebase.initializeApp(firebaseConfig);

//************* USER ********************

function registerUser(email, name, password, favorites, reviews, settings, profile_pic_id) {
  const format_email = email.replace(".","-");
  firebase.database().ref('users/' + format_email).set({
    user_id:format_email,
    name: name,
    user_email:email,
    hash_pass: password,
    favorites:favorites,
    reviews:reviews,
    settings:settings,
    profile_pic_id: profile_pic_id
  }).catch((err) => console.log(err));
}

function getUserData(email) {
  const format_email = email.replace(".","-");
  return firebase.database().ref('users/' + format_email).once('value').then(function(snapshot) {
    return {
      user_id: snapshot.val().user_id,
      name: snapshot.val().name,
      user_email: snapshot.val().user_email,
      hash_pass: snapshot.val().hash_pass,
      favorites: snapshot.val().favorites,
      reviews:snapshot.val().reviews,
      settings: snapshot.val().settings,
      profile_pic_id: snapshot.val().profile_pic_id
    }
  });
}

function doesUserExist(email) {
  const format_email = email.replace(".","-");
  return firebase.database().ref('users/' + format_email).once('value').then(function(snapshot) {
   if (!snapshot.exists()){
      console.log("user does not exist!");
      // TODO: Handle that users do exist
      return false;
   }
   console.log("user exists!");
   return true;
});
}

//************* ADMIN ********************


function registerAdmin(email, password, history, settings) {
  const format_email = email.replace(".","-");
  firebase.database().ref('admins/' + format_email).set({
    user_id:format_email,
    admin_email:email,
    hash_pass: password,
    history: history,
    settings: settings,
  }).catch((err) => console.log(err));
}

function getAdminData(email) {
  const format_email = email.replace(".","-");
  return firebase.database().ref('admins/' + format_email).once('value').then(function(snapshot) {
    return {
      user_id:snapshot.val().user_id,
      admin_email:snapshot.val().admin_email,
      hash_pass: snapshot.val().hash_pass,
      history: snapshot.val().history,
      settings: snapshot.val().settings,
    }
  });
}

//************* BUSINESS ********************

function registerBusiness(business_id, name, reviews, owner, picture_ids, description, location, email, information, control_number, address_line1, address_line2, rating) {
  const format_id = business_id.replace(".","-");
  firebase.database().ref('businesses/' + format_id).set({
    business_id:format_id,
    name: name,
    reviews: reviews,
    owner: owner,
    picture_ids:[],
    description: description,
    location: {},
    email: email,
    information: information,
    control: control_number,
    address_line1: address_line1,
    address_line2: address_line2,
    rating: rating,
    flagged: 0,
    removed: false,
  }).catch((err) => console.log(err));
}


function addReviewToBusiness(business_id, reviews) {
    const format_id = business_id.replace(".","-");
    firebase.database().ref('businesses/' + format_id + "/reviews/").set(reviews).catch((err) => console.log(err));
}

function getBusinessWithID(business_id) {
  const format_id = business_id.replace(".","-");
  return firebase.database().ref('businesses/' + format_id).once('value').then(function(snapshot) {
    return snapshot.val().name
  });
}

function getBusinessData(business_id) {
  const format_id = business_id.replace(".","-");
  return firebase.database().ref('businesses/' + format_id).once('value').then(function(snapshot) {
    return {
      business_id:snapshot.val().business_id,
      name: snapshot.val().name,
      reviews: snapshot.val().reviews,
      owner: snapshot.val().owner,
      picture_ids:snapshot.val().picture_ids,
      description: snapshot.val().description,
      location: snapshot.val().location,
      email: snapshot.val().email,
      information: snapshot.val().information,
      control: snapshot.val().control,
      address_line1: snapshot.val().address_line1,
      address_line2: snapshot.val().address_line2,
      removed: snapshot.val().removed,
      rating: snapshot.val().rating,
      flagged: snapshot.val().flagged,

    }
  });
}

function getAllBusinessData() {
  return firebase.database().ref('businesses/').once('value').then(function(snapshot) {
    return snapshot.val();
  });
}

function setBusinessRating(business_id, rating) {
  const format_id = business_id.replace(".","-");
  firebase.database().ref('businesses/' + format_id + '/rating/').set(rating).catch((err) => console.log(err));
}

function updateBusinessRating(business_id) {
  let biz;
  let ratingTotal = 0;
  let ratingNumber = 0;
  let rating = 0;
  getBusinessData(business_id).then(b_object => {
    biz = b_object;

    biz.reviews.map(function(review) {
      getReviewData(review).then(r_object => {
        ratingNumber++;
        ratingTotal += r_object.rating;
        rating = ratingTotal / ratingNumber;
        setBusinessRating(business_id, rating);
      })
    })
  })
}

function removeBusiness(business_id) {
  const format_id = business_id.replace(".","-");
  firebase.database().ref('businesses/' + format_id).set({
    //TODO: Add other fields if necessary
    removed: true,
  }).catch((err) => console.log(err));
}

function flagBusiness(business_id) {
  const format_id = business_id.replace(".","-");
  let flag = 0;
  getBusinessData(format_id).then(b_object => {
    flag = b_object.flagged + 1;
  });
  firebase.database().ref('businesses/' + format_id).set({
    //TODO: Add other fields if necessary
    flagged: flag,
  }).catch((err) => console.log(err));
}

//************* REVIEW ********************


function addReviewToDatabase(review_id, review_content, user_id, business_id, date, rating) {
  const format_id = review_id.replace(".","-");
  firebase.database().ref('reviews/' + review_id).set({
    review_id:format_id,
    review_content:review_content,
    user_id: user_id,
    business_id: business_id,
    date:date,
    rating:rating,
    flagged: 0,
    removed: false
  }).catch((err) => console.log(err));
} 

function getReviewData(review_id) {
  const format_id = review_id.replace(".","-");
  return firebase.database().ref('reviews/' + format_id).once('value').then(function(snapshot) {
    return {
      review_id:snapshot.val().review_id,
      review_content:snapshot.val().review_content,
      user_id: snapshot.val().user_id,
      business_id: snapshot.val().business_id,
      date: snapshot.val().date,
      rating: snapshot.val().rating,
      flagged: snapshot.val().flagged,
      removed: snapshot.val().removed,
    }
  });
}

function getAllReviews() {
  return firebase.database().ref('reviews/').once('value').then(function(snapshot) {
    return snapshot.val();
  });
}


function removeReview(review_id, user_id, business_id) {
  const format_id = review_id.replace(".","-");
  firebase.database().ref('reviews/' + format_id).set({
    //TODO: Add other fields if necessary
    removed: true,
  }).catch((err) => console.log(err));
}

function flagReview(review_id) {
  const format_id = review_id.replace(".","-");
  let flag = 0;
  getBusinessData(format_id).then(r_object => {
    flag = r_object.flagged + 1;
  });
  firebase.database().ref('reviews/' + format_id).set({
    //TODO: Add other fields if necessary
    flagged: flag,
  }).catch((err) => console.log(err));
}


//************* EXPORTS ********************

module.exports = {
  registerUser: registerUser,
  getUserData: getUserData,
  registerAdmin: registerAdmin,
  getAdminData: getAdminData,
  registerBusiness: registerBusiness,
  getBusinessData: getBusinessData,
  getBusinessWithID: getBusinessWithID,
  addReviewToDatabase: addReviewToDatabase,
  getReviewData: getReviewData,
  getAllReviews: getAllReviews,
  doesUserExist: doesUserExist,
  addReviewToBusiness: addReviewToBusiness,
  getAllBusinessData: getAllBusinessData,
  setBusinessRating: setBusinessRating,
  updateBusinessRating: updateBusinessRating,
  removeBusiness: removeBusiness,
  removeReview: removeReview,
  flagBusiness: flagBusiness,
  flagReview: flagReview,
};