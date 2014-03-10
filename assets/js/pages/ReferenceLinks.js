// Mast.define('ReferenceLinks', function() {

//     return {
//         afterRender: function() {
//             this.renderLinks();
//         },


//         events: {
//             'click div.template': 'changeTemplate'
//         },

//         // Render a template that is passed in
//         renderTemplate: function(templateName) {
//             this.referenceNavRegion.attach(templateName);
//         },

//         renderLinks: function() {

//             var refSection = {};


//             var getHead = function getHead(tName,cb){
//                 var getFirstLine = tName.match(/>[^]+?\n/)[0].replace(/[\r\t\n]/ig, '');
//                 var noTags = getFirstLine.replace(/<[\/]{0,1}?[^]+?>/ig,'');
//                 noTags = noTags.substr(1,noTags.length);

//                 var index = noTags.indexOf('(');

//                 if (index>=0)
//                     noTags = noTags.substr(0,index)+'()';

//                 index = noTags.indexOf('&lt;')

//                 if (index>=0)
//                     noTags = noTags.replace(/&lt;[^]+?&gt;/ig,'<model>');

//                 return cb(noTags);
//             }


//             for (var key in Mast.templates) {

//                 var splitHead = key.split('/');
//                 var sectionHead = splitHead[0].split('.html')[0];

//                 // If template name has a '/' in it, its probably for reference.
//                 // Send it to getHead to pull out the display name for the nav menu.

//                 if (key.match(/\//)) {
//                     getHead(Mast.templates[key](),function ghCB(justTheTip){

//                         if (!refSection[splitHead[0]])
//                             refSection[splitHead[0]] = [];

//                         refSection[splitHead[0]].unshift(justTheTip+'_key_'+key.replace(/\//,'\/'));

//                     });

//                 }
//             }


//             for (var sec in refSection) {
//                 var sectionHTML = '<li class="main-section-title active">';
//                 var sectionSubs = refSection[sec];
//                 var isFirst = true;

//                 while (sectionSubs.length > 0) {
//                     var nameKey = sectionSubs.pop().split('_key_');
//                     var templateLink = nameKey[1];
//                     var thisSub = nameKey[0];

//                     var divClass = 'sub';

//                     if (isFirst) {
//                         sectionHTML += '<a href="#!documentation/reference/'+templateLink+'"><span>' + thisSub + '</span></a><ul class="subsections">';
//                         isFirst = false;
//                     } else {
//                         sectionHTML += '<li><a href="#!documentation/reference/'+templateLink+'">' + thisSub + '</a></li>';
//                     }
//                 }
//                 sectionHTML += '</ul></li>';
//                 this.$('.templateLinks').append(sectionHTML);
//             }

//         },

//         changeTemplate: function(e) {
//             e.stopPropagation();
//             e.stopImmediatePropagation();
//             var template = $(e.currentTarget).attr('data-template-name');

//             this.mainContentRegion.attach(templateName);
//         }

//     };
// })
