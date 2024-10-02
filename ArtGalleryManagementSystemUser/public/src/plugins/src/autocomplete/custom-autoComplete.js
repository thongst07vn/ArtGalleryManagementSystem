//Size
const autoCompleteJS = new Size({
    selector: "#Size",
    placeHolder: "Search Size",
    data: {
        src: [
           
            "+260 - Zambia",
            "+263 - Zimbabwe"
        ],
        cache: true,
    },
    resultsList: {
        element: (list, data) => {
            if (!data.results.length) {
                // Create "No Results" message element
                const message = document.createElement("div");
                // Add class to the created element
                message.setAttribute("class", "no_result");
                // Add message text content
                message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
                // Append message element to the results list
                list.prepend(message);
            }
        },
        noResults: true,
    },
    resultItem: {
        highlight: {
            render: true
        }
    },
    events: {
        input: {
          focus() {
            if (autoCompleteJS.input.value.length) autoCompleteJS.start();
          },
          selection(event) {
            const feedback = event.detail;
            // Prepare User's Selected Value
            const selection = feedback.selection.value;
            // Replace Input value with the selected value
            autoCompleteJS.input.value = selection;
          },
        },
    },
});
//Paint
const PaintJS = new Paint({
    selector: "#Paint",
    placeHolder: "Search Paint",
    data: {
        src: [
           
            "+260 - Zambia",
            "+263 - Zimbabwe"
        ],
        cache: true,
    },
    resultsList: {
        element: (list, data) => {
            if (!data.results.length) {
                // Create "No Results" message element
                const message = document.createElement("div");
                // Add class to the created element
                message.setAttribute("class", "no_result");
                // Add message text content
                message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
                // Append message element to the results list
                list.prepend(message);
            }
        },
        noResults: true,
    },
    resultItem: {
        highlight: {
            render: true
        }
    },
    events: {
        input: {
          focus() {
            if (PaintJS.input.value.length) PaintJS.start();
          },
          selection(event) {
            const feedback = event.detail;
            // Prepare User's Selected Value
            const selection = feedback.selection.value;
            // Replace Input value with the selected value
            PaintJS.input.value = selection;
          },
        },
    },
});
//Material
const MaterialJS = new Material({
    selector: "#Material",
    placeHolder: "Search Material",
    data: {
        src: [
           
            "+260 - Zambia",
            "+263 - Zimbabwe"
        ],
        cache: true,
    },
    resultsList: {
        element: (list, data) => {
            if (!data.results.length) {
                // Create "No Results" message element
                const message = document.createElement("div");
                // Add class to the created element
                message.setAttribute("class", "no_result");
                // Add message text content
                message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
                // Append message element to the results list
                list.prepend(message);
            }
        },
        noResults: true,
    },
    resultItem: {
        highlight: {
            render: true
        }
    },
    events: {
        input: {
          focus() {
            if (MaterialJS.input.value.length) MaterialJS.start();
          },
          selection(event) {
            const feedback = event.detail;
            // Prepare User's Selected Value
            const selection = feedback.selection.value;
            // Replace Input value with the selected value
            MaterialJS.input.value = selection;
          },
        },
    },
});



// const example2 = new example2({
//     selector: "#example2",
//     placeHolder: "Enter Country Code",
//     data: {
//         src: [
//             "+93 - Afghanistan",
//             "+358 - Aland Islands",
//             "+355 - Albania",
//             "+213 - Algeria",
//             "+1684 - American Samoa",
//             "+376 - Andorra",
//             "+244 - Angola",
//             "+1264 - Anguilla",
//             "+672 - Antarctica",
//             "+1268 - Antigua and Barbuda",
//             "+54 - Argentina",
//             "+374 - Armenia",
//             "+297 - Aruba",
//             "+61 - Australia",
//             "+43 - Austria",
//             "+994 - Azerbaijan",
//             "+1242 - Bahamas",
//             "+973 - Bahrain",
//             "+880 - Bangladesh",
//             "+1246 - Barbados",
//             "+375 - Belarus",
//             "+32 - Belgium",
//             "+501 - Belize",
//             "+229 - Benin",
//             "+1441 - Bermuda",
//             "+975 - Bhutan",
//             "+591 - Bolivia",
//             "+599 - Bonaire, Sint Eustatius and Saba",
//             "+387 - Bosnia and Herzegovina",
//             "+267 - Botswana",
//             "+55 - Bouvet Island",
//             "+55 - Brazil",
//             "+246 - British Indian Ocean Territory",
//             "+673 - Brunei Darussalam",
//             "+359 - Bulgaria",
//             "+226 - Burkina Faso",
//             "+257 - Burundi",
//             "+855 - Cambodia",
//             "+237 - Cameroon",
//             "+1 - Canada",
//             "+238 - Cape Verde",
//             "+1345 - Cayman Islands",
//             "+236 - Central African Republic",
//             "+235 - Chad",
//             "+56 - Chile",
//             "+86 - China",
//             "+61 - Christmas Island",
//             "+672 - Cocos (Keeling) Islands",
//             "+57 - Colombia",
//             "+269 - Comoros",
//             "+242 - Congo",
//             "+242 - Congo, Democratic Republic of the Congo",
//             "+682 - Cook Islands",
//             "+506 - Costa Rica",
//             "+225 - Cote D'Ivoire",
//             "+385 - Croatia",
//             "+53 - Cuba",
//             "+599 - Curacao",
//             "+357 - Cyprus",
//             "+420 - Czech Republic",
//             "+45 - Denmark",
//             "+253 - Djibouti",
//             "+1767 - Dominica",
//             "+1809 - Dominican Republic",
//             "+593 - Ecuador",
//             "+20 - Egypt",
//             "+503 - El Salvador",
//             "+240 - Equatorial Guinea",
//             "+291 - Eritrea",
//             "+372 - Estonia",
//             "+251 - Ethiopia",
//             "+500 - Falkland Islands (Malvinas)",
//             "+298 - Faroe Islands",
//             "+679 - Fiji",
//             "+358 - Finland",
//             "+33 - France",
//             "+594 - French Guiana",
//             "+689 - French Polynesia",
//             "+262 - French Southern Territories",
//             "+241 - Gabon",
//             "+220 - Gambia",
//             "+995 - Georgia",
//             "+49 - Germany",
//             "+233 - Ghana",
//             "+350 - Gibraltar",
//             "+30 - Greece",
//             "+299 - Greenland",
//             "+1473 - Grenada",
//             "+590 - Guadeloupe",
//             "+1671 - Guam",
//             "+502 - Guatemala",
//             "+44 - Guernsey",
//             "+224 - Guinea",
//             "+245 - Guinea-Bissau",
//             "+592 - Guyana",
//             "+509 - Haiti",
//             "+0 - Heard Island and Mcdonald Islands",
//             "+39 - Holy See (Vatican City State)",
//             "+504 - Honduras",
//             "+852 - Hong Kong",
//             "+36 - Hungary",
//             "+354 - Iceland",
//             "+91 - India",
//             "+62 - Indonesia",
//             "+98 - Iran, Islamic Republic of",
//             "+964 - Iraq",
//             "+353 - Ireland",
//             "+44 - Isle of Man",
//             "+972 - Israel",
//             "+39 - Italy",
//             "+1876 - Jamaica",
//             "+81 - Japan",
//             "+44 - Jersey",
//             "+962 - Jordan",
//             "+7 - Kazakhstan",
//             "+254 - Kenya",
//             "+686 - Kiribati",
//             "+850 - Korea, Democratic People's Republic of",
//             "+82 - Korea, Republic of",
//             "+381 - Kosovo",
//             "+965 - Kuwait",
//             "+996 - Kyrgyzstan",
//             "+856 - Lao People's Democratic Republic",
//             "+371 - Latvia",
//             "+961 - Lebanon",
//             "+266 - Lesotho",
//             "+231 - Liberia",
//             "+218 - Libyan Arab Jamahiriya",
//             "+423 - Liechtenstein",
//             "+370 - Lithuania",
//             "+352 - Luxembourg",
//             "+853 - Macao",
//             "+389 - Macedonia, the Former Yugoslav Republic of",
//             "+261 - Madagascar",
//             "+265 - Malawi",
//             "+60 - Malaysia",
//             "+960 - Maldives",
//             "+223 - Mali",
//             "+356 - Malta",
//             "+692 - Marshall Islands",
//             "+596 - Martinique",
//             "+222 - Mauritania",
//             "+230 - Mauritius",
//             "+269 - Mayotte",
//             "+52 - Mexico",
//             "+691 - Micronesia, Federated States of",
//             "+373 - Moldova, Republic of",
//             "+377 - Monaco",
//             "+976 - Mongolia",
//             "+382 - Montenegro",
//             "+1664 - Montserrat",
//             "+212 - Morocco",
//             "+258 - Mozambique",
//             "+95 - Myanmar",
//             "+264 - Namibia",
//             "+674 - Nauru",
//             "+977 - Nepal",
//             "+31 - Netherlands",
//             "+599 - Netherlands Antilles",
//             "+687 - New Caledonia",
//             "+64 - New Zealand",
//             "+505 - Nicaragua",
//             "+227 - Niger",
//             "+234 - Nigeria",
//             "+683 - Niue",
//             "+672 - Norfolk Island",
//             "+1670 - Northern Mariana Islands",
//             "+47 - Norway",
//             "+968 - Oman",
//             "+92 - Pakistan",
//             "+680 - Palau",
//             "+970 - Palestinian Territory, Occupied",
//             "+507 - Panama",
//             "+675 - Papua New Guinea",
//             "+595 - Paraguay",
//             "+51 - Peru",
//             "+63 - Philippines",
//             "+64 - Pitcairn",
//             "+48 - Poland",
//             "+351 - Portugal",
//             "+1787 - Puerto Rico",
//             "+974 - Qatar",
//             "+262 - Reunion",
//             "+40 - Romania",
//             "+70 - Russian Federation",
//             "+250 - Rwanda",
//             "+590 - Saint Barthelemy",
//             "+290 - Saint Helena",
//             "+1869 - Saint Kitts and Nevis",
//             "+1758 - Saint Lucia",
//             "+590 - Saint Martin",
//             "+508 - Saint Pierre and Miquelon",
//             "+1784 - Saint Vincent and the Grenadines",
//             "+684 - Samoa",
//             "+378 - San Marino",
//             "+239 - Sao Tome and Principe",
//             "+966 - Saudi Arabia",
//             "+221 - Senegal",
//             "+381 - Serbia",
//             "+381 - Serbia and Montenegro",
//             "+248 - Seychelles",
//             "+232 - Sierra Leone",
//             "+65 - Singapore",
//             "+1 - Sint Maarten",
//             "+421 - Slovakia",
//             "+386 - Slovenia",
//             "+677 - Solomon Islands",
//             "+252 - Somalia",
//             "+27 - South Africa",
//             "+500 - South Georgia and the South Sandwich Islands",
//             "+211 - South Sudan",
//             "+34 - Spain",
//             "+94 - Sri Lanka",
//             "+249 - Sudan",
//             "+597 - Suriname",
//             "+47 - Svalbard and Jan Mayen",
//             "+268 - Swaziland",
//             "+46 - Sweden",
//             "+41 - Switzerland",
//             "+963 - Syrian Arab Republic",
//             "+886 - Taiwan, Province of China",
//             "+992 - Tajikistan",
//             "+255 - Tanzania, United Republic of",
//             "+66 - Thailand",
//             "+670 - Timor-Leste",
//             "+228 - Togo",
//             "+690 - Tokelau",
//             "+676 - Tonga",
//             "+1868 - Trinidad and Tobago",
//             "+216 - Tunisia",
//             "+90 - Turkey",
//             "+7370 - Turkmenistan",
//             "+1649 - Turks and Caicos Islands",
//             "+688 - Tuvalu",
//             "+256 - Uganda",
//             "+380 - Ukraine",
//             "+971 - United Arab Emirates",
//             "+44 - United Kingdom",
//             "+1 - United States",
//             "+1 - United States Minor Outlying Islands",
//             "+598 - Uruguay",
//             "+998 - Uzbekistan",
//             "+678 - Vanuatu",
//             "+58 - Venezuela",
//             "+84 - Viet Nam",
//             "+1284 - Virgin Islands, British",
//             "+1340 - Virgin Islands, U.s.",
//             "+681 - Wallis and Futuna",
//             "+212 - Western Sahara",
//             "+967 - Yemen",
//             "+260 - Zambia",
//             "+263 - Zimbabwe"
//         ],
//         cache: true,
//     },
//     resultsList: {
//         element: (list, data) => {
//             if (!data.results.length) {
//                 // Create "No Results" message element
//                 const message = document.createElement("div");
//                 // Add class to the created element
//                 message.setAttribute("class", "no_result");
//                 // Add message text content
//                 message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
//                 // Append message element to the results list
//                 list.prepend(message);
//             }
//         },
//         noResults: true,
//     },
//     resultItem: {
//         highlight: {
//             render: true
//         }
//     },
//     events: {
//         input: {
//           focus() {
//             if (example2.input.value.length) example2.start();
//           },
//           selection(event) {
//             const feedback = event.detail;
//             // Prepare User's Selected Value
//             const selection = feedback.selection.value;
            
//             // Replace Input value with the selected value
//             example2.input.value = selection;
//           },
//         },
//     },
// });