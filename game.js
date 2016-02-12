var active_tab = '';
var tmr = null;
var sec_tmr = null;
var save_tmr = null;
var last_save_tmr = null;
var stat_tmr = null;
var event_tmr = null;
var ver_tmr = null;
var last_tick = (new Date).getTime();
var last_saved = 0;
var last_click = 0;
var last_bust = 0;
var last_float = 10;

var tick_ms = 100;

function Game() {

    var pd = {
        'title':'BitClicker, the Bitcoin Clicking Game',
        'version':'1.0',
        'make_amount':1,
        'make_rps_multiplier':0,
        'sell_amount':1,
        'sell_rps_multiplier':0,
        'sell_return':0.5,
        'economy_roi':1,
        'difficulty_multiplier':1,
        'economy_rois':[
            {
                'roi':0.5,
                'label':'Poor',
            },
            {
                'roi':1,
                'label':'Average',
            },
            {
                'roi':1.5,
                'label':'Good',
            },
            {
                'roi':2,
                'label':'Very Good',
            },
        ],
        'difficulty_level':0,
        'difficulty_levels':[
            {
                'level':0,
                'label':'Default',
            },
            {
                'level':1,
                'label':'Hard',
            },
            {
                'level':2,
                'label':'Insane',
            },
        ],
        'risk_amount':0,
        'risk2_amount':0,
        'risk_levels':[
            {
                'level':0.0001,
                'label':'nearly impossible',
                'color':'green',
            },
            {
                'level':0.005,
                'label':'super low',
                'color':'green',
            },
            {
                'level':0.05,
                'label':'very low',
                'color':'green'
            },
            {
                'level':0.2,
                'label':'low',
                'color':'green',
            },
            {
                'level':0.35,
                'label':'moderate',
                'color':'orange',
            },
            {
                'level':0.50,
                'label':'high',
                'color':'red',
            },
            {
                'level':0.7,
                'label':'very high',
                'color':'red',
            },
            {
                'level':0.9,
                'label':'nearly certain (!)',
                'color':'red',
            },
            {
                'level':100000000000000000,
                'label':'certain (!!)',
                'color':'red',
            },
        ],
        'cash': {
            'amount':0,
            'safe':0,
            'safe_rps':0,
            'label':'United States Dollars',
            'action_label':'EXCHANGE!',
        },
        'widget_roi':1,
        'widgets':{
            'amount':0,
            'label':'Bitcoin',
            'action_label':'MINE!',
            'qualities':{
                1: 'dirt cheap',
                2: 'cheap',
                4: 'still cheap',
                6: 'getting better',
                10: 'okay',
                13: 'good',
                16: 'great',
                20: 'really great',
                25: 'like 2011',
                50: 'awesome',
                100: 'at early 2013 levels',
                300: 'shooting up',
                500: 'going to the moon',
                800: 'going to mars',
                1242: 'at an all-time high!',
                250: 'at current levels',
            },
        },

        'banks':{
            'b_lemonade':{
                'amount':0,
                'label':'Safe',
                'description':'Keep your mining earnings in a small safe.',
                'rps':1,
                'unlock_rps':1,
                'cost': getBankCost(0),
                'base_cost':getBankCost(0),
                'unlocked':true,
                'sid':'b1',
            },
            'b_nail_salon':{
                'amount':0,
                'label':'Hidden Room',
                'description':'Fill a hidden room with cash to keep it safe from the IRS.',
                'rps':12,
                'unlock_rps':5,
                'cost': getBankCost(1),
                'base_cost': getBankCost(1),
                'unlocked':false,
                'sid':'b2',
            },
            'b_banana_stand':{
                'amount':0,
                'label':'Local Bank',
                'description':'Deposit small amounts of cash in a local bank.',
                'rps':120,
                'unlock_rps':12,
                'cost':getBankCost(2),
                'base_cost':getBankCost(2),
                'unlocked':false,
                'sid':'b3',
            },
            'b_chicken_place':{
                'amount':0,
                'label':'Cayman Bank Account',
                'description':'Put money into a Cayman bank account.',
                'rps':1500,
                'unlock_rps':150,
                'cost':getBankCost(3),
                'base_cost':getBankCost(3),
                'unlocked':false,
                'sid':'b4',
            },
            'b_laser_tag':{
                'amount':0,
                'label':'Swiss Bank Account',
                'description':'Deposit large amounts of cash into a Swiss account.',
                'rps':16000,
                'unlock_rps':500,
                'cost':getBankCost(4),
                'base_cost':getBankCost(4),
                'unlocked':false,
                'sid':'b5',
            },
            'b_car_wash':{
                'label':'Small Island',
                'amount':0,
                'description':'Buy a small Pacific island and keep cash there.',
                'rps':220000,
                'unlock_rps':5000,
                'cost':getBankCost(5),
                'base_cost':getBankCost(5),
                'unlocked':false,
                'sid':'b6',
            },
            'b_donations':{
                'label':'Register with the IRS as a religion',
                'amount':0,
                'description':'Register as a religion to keep most of your cash safe.',
                'rps':5200000,
                'unlock_rps':50000,
                'cost':getBankCost(6),
                'base_cost':getBankCost(6),
                'unlocked':false,
                'sid':'b7',
            },
            'b_offshore': {
                'label':'The Bitcoin Bank',
                'amount':0,
                'description':'Keep your cash safe under the disguise of a bank',
                'rps':60000000,
                'unlock_rps':500000,
                'cost':getBankCost(7),
                'base_cost':getBankCost(7),
                'unlocked':false,
                'sid':'b8',
            },
            'b_nyme': {
                'label':'NYSE',
                'amount':0,
                'description':'Secure high volumes of cash through stocks and bonds on '
                    + 'the New York Stock Exchange ',
                'rps':750000000,
                'unlock_rps':5000000,
                'cost':getBankCost(8),
                'base_cost':getBankCost(8),
                'unlocked':false,
                'sid':'b9',
            },
            'b_franchise': {
                'label':'Food Franchise',
                'amount':0,
                'description':'Secure cash through a food franchise.',
                'rps':4550000000,
                'unlock_rps':15000000,
                'cost':getBankCost(9),
                'base_cost':getBankCost(9),
                'unlocked':false,
                'sid':'b10',
            },
            'b_cantina': {
                'label':'Space Cantina',
                'amount':0,
                'description':'Secure your cash on an intergalactic scale with the Space Cantina',
                'rps':14550000000,
                'unlock_rps':30000000,
                'cost':getBankCost(10),
                'base_cost':getBankCost(10),
                'unlocked':false,
                'sid':'b11',
            },
            'b_resort':{
                'label':'Space Resort',
                'amount':0,
                'description':'Secure your cash through a low gravity spa and resort',
                'rps':200000000000,
                'unlock_rps':50000000,
                'cost':getBankCost(11),
                'base_cost':getBankCost(11),
                'unlocked':false,
                'sid':'b12',
            },
            'b_spacecorp':{
                'label':'Space Corp',
                'amount':0,
                'description':'Secure cash through a shady conglomerate that deals in planetary '
				    +  'colonisation, asteroid mining, and other technology, with secret ties to the military',
                'rps':1200000000000,
                'unlock_rps':125000000,
                'cost':getBankCost(12),
                'base_cost':getBankCost(12),
                'unlocked':false,
                'sid':'b13',
            },
        },

        'clickers':{
            '01_storage_shed':{
                'label':'Penntium 4 CPU',
                'description':'A cheap CPU that lay unused in an old computer.',
                'amount':0,
                'risk':0.05,
                'rps':1,
                'base_cost':getClickerCost(0),
                'cost':getClickerCost(0),
                'unlock_rps':0,
                'unlocked':true,
                'sid':'c1',
				        'img':'http://i.imgur.com/lRCNimC.jpg',
            },
            '03_used_rv':{
                'label':'Celeryon CPU',
                'description':'A low-cost CPU from your local computer parts store.',
                'amount':0,
                'risk':0.05,
                'rps':5,
                'base_cost':getClickerCost(1),
                'cost':getClickerCost(1),
                'unlock_rps':1,
                'unlocked':false,
                'sid':'c2',
				        'img': 'http://i.imgur.com/LcKJ5TP.jpg',
            },
            'trailer':{
                'label':'Core 3 Quad CPU',
                'description':'A medium-cost CPU from your local computer parts store.',
                'amount':0,
                'risk':.005,
                'rps':10,
                'base_cost':getClickerCost(2),
                'cost':getClickerCost(2),
                'unlock_rps':6,
                'unlocked':false,
                'sid':'c3',
				        'img':'http://i.imgur.com/Trho4UU.jpg',
            },
            '05_house':{
                'label':'Core eye7 CPU',
                'description':'A higher-end CPU from an online retailer.',
                'amount':0,
                'risk':.05,
                'rps':25,
                'base_cost':getClickerCost(3),
                'cost':getClickerCost(3),
                'unlock_rps':12,
                'unlocked':false,
                'sid':'c4',
				        'img':'http://i.imgur.com/F0uwwCf.jpg',
            },
            '07_warehouse':{
                'label':'Quad Intell Zeon CPU',
                'description':'The best CPU on the market, times four.',
                'amount':0,
                'rps':60,
                'risk':0.05,
                'base_cost':getClickerCost(4),
                'cost':getClickerCost(4),
                'unlock_rps':30,
                'unlocked':false,
                'sid':'c5',
				        'img':'http://i.imgur.com/AIPOL7h.jpg',
            },
            '09_lab':{
                'label':'AEmD 4870 GPU',
                'description':'A low-end GPU from 2008.',
                'amount':0,
                'rps':100,
                'risk':.1,
                'base_cost':getClickerCost(5),
                'cost':getClickerCost(5),
                'unlock_rps':100,
                'unlocked':false,
                'sid':'c6',
		            'img':'http://i.imgur.com/uNBf9dk.jpg',
            },
            '10_under_lab': {
                'label':'AEmD 5870 GPU',
                'description':'A GPU one tier above the 4870.',
                'amount':0,
                'risk':0.005,
                'rps':500,
                'base_cost':getClickerCost(6),
                'cost':getClickerCost(6),
                'unlock_rps':250,
                'unlocked':false,
                'sid':'c7',
		            'img':'http://i.imgur.com/nVhmN5U.png',
            },
            '11_bot': {
                'label':'Triple AEmD 7990 GPUs',
                'description':'The greatest bitcoin mining GPUs ever to hit the market.',
                'amount':0,
                'risk':0.1,
                'rps':3000,
                'base_cost':getClickerCost(7),
                'cost':getClickerCost(7),
                'unlock_rps':750,
                'unlocked':false,
                'sid':'c8',
	              'img':'http://i.imgur.com/G033yZF.jpg',
            },
            '11_bot_s': {
                'label':'Dual Block Destroyer Blades',
                'description':'ASIC Technology by ASICMYNER',
                'amount':0,
                'risk':0.1,
                'rps':20000,
                'base_cost':getClickerCost(8),
                'cost':getClickerCost(8),
                'unlock_rps':3900,
                'unlocked':false,
                'sid':'c9',
				        'img':'http://i.imgur.com/JnFkPjH.jpg',
            },
            'under_complex':{
                'label':'KFCMiner Mercury',
                'description':'An high hashrate ASIC bitcoin miner by KFCMiner',
                'amount':0,
                'risk':0.005,
                'rps':100000,
                'base_cost':getClickerCost(9),
                'cost':getClickerCost(9),
                'unlock_rps':24500,
                'unlocked':false,
                'sid':'c10',
		            'img':'http://i.imgur.com/S5NAULj.jpg',
            },
            'country':{
                'label':'ByteForce Mini Rig',
                'description':'A high-hashrate bitcoin mining rig.',
                'amount':0,
                'risk':0.00000001,
                'rps':500000,
                'base_cost':getClickerCost(10),
                'cost':getClickerCost(10),
                'unlock_rps':125000,
                'unlocked':false,
                'sid':'c11',
		            'img':'http://i.imgur.com/fGBFBgo.png',
            },
            '12_moon_lab': {
                'label':'AuntMiner S5',
                'description':'Over 1 TH/s is churned out by this 3rd-generation rig.',
                'amount':0,
                'risk':0.00000001,
                'rps':2000000,
                'base_cost':getClickerCost(11),
                'cost':getClickerCost(11),
                'unlock_rps':650000,
                'unlocked':false,
                'sid':'c12',
		            'img':'http://i.imgur.com/ez9vsR9.jpg',
            },
            'station': {
                'label':'14nm ASIC Technology',
                'description':'Advanced ASIC technology which will soon be released to the public.',
                'amount':0,
                'risk':0.000000001,
                'rps':10000000,
                'base_cost':getClickerCost(12),
                'cost':getClickerCost(12),
                'unlock_rps':2750000,
                'unlocked':false,
                'sid':'c13',
		            'img':'http://i.imgur.com/GOSfb3s.png',
            },
            'meth_factory':{
                'label':'Experimental 5nm ASIC Technology',
                'description':'Experiments undertaken by your team of researches ' +
				                      'have been successful, and 5nm ASIC miners are now a reality.',
                'amount':0,
                'risk':0.55,
                'rps':75000000,
                'base_cost':getClickerCost(13),
                'cost':getClickerCost(13),
                'unlock_rps':13000000,
                'unlocked':false,
                'sid':'c14',
		            'img':'http://i.imgur.com/vMBdaRA.jpg',
            },
            'belt':{
                'label':'Highly Advanced 0.5nm ASIC Chips',
                'description':'Your team of researchers have been able to '
                    + 'break laws of quantum mechanics and produce 0.5nm chips.',
                'amount':0,
                'risk':0.000001,
                'rps':500000000,
                'base_cost':getClickerCost(14),
                'cost':getClickerCost(14),
                'unlock_rps':90000000,
                'unlocked':false,
                'sid':'c15',
		            'img':'http://i.imgur.com/Zid53tA.jpg',
            },
            'c_planet':{
                'label':'Satoshi\'s Miner',
                'description':'Your team finds Satoshi\'s real identity '
           		    + 'and he gives you the blueprints for his own miner.  (For a price, of course, and a very high one at that.)',
                'amount':0,
                'risk':0.000001,
                'rps':5000000000,
                'base_cost':getClickerCost(15),
                'cost':getClickerCost(15),
                'unlock_rps':600000000,
                'unlocked':false,
                'sid':'c16',
		            'img':'http://i.imgur.com/y83BhpQ.jpg',
            },
            'c_portal':{
                'label':'51% Attack',
                'description':'Surreptitiously 51% attack the bitcoin network and double ' +
                              'spend your coins!  51% other blockchains as well for more fun!',
                'amount':0,
                'risk':0.1,
                'rps':50000000000,
                'base_cost':getClickerCost(16),
                'cost':getClickerCost(16),
                'unlock_rps':7500000000,
                'unlocked':false,
                'sid':'c17',
		            'img':'http://i.imgur.com/V6fmQ4g.png',
            },
        },


        'sellers':{
            '01_dealer':{
                'label':'Local Contacts',
                'description':'Sell neglible amounts of bitcoin to local contacts.',
                'amount':0,
                'risk':0.05,
                'rps':1,
                'base_cost':getClickerCost(0),
                'cost':getClickerCost(0),
                'unlock_rps':0,
                'unlocked':true,
                'sid':'s1',
				        'img':'http://i.imgur.com/9xRbnMP.png',
            },
            '03_drug_mule':{
                'label':'Forum Trades',
                'description':'Sell tiny amounts of bitcoin to users of the bitcoin forum.',
                'amount':0,
                'risk':.005,
                'rps':5,
                'base_cost':getClickerCost(1),
                'cost':getClickerCost(1),
                'unlock_rps':1,
                'unlocked':false,
                'sid':'s2',
				        'img':'http://i.imgur.com/ioxkOq5.jpg',
            },
            'drug_van':{
                'label':'Coin Bass',
                'description':'Sell small amounts of bitcoin on your Coin Bass account.',
                'amount':0,
                'risk':.005,
                'rps':10,
                'base_cost':getClickerCost(2),
                'cost':getClickerCost(2),
                'unlock_rps':6,
                'unlocked':false,
                'sid':'s3',
		            'img':'http://i.imgur.com/VYiYcUu.png',
            },
            'cheap_lawyer':{
                'label':'Precious Metals',
                'description':'Buy precious metals using medium amounts of bitcoin, and sell the metals for cash.',
                'amount':0,
                'risk':0,
                'rps':25,
                'base_cost':getClickerCost(3),
                'cost':getClickerCost(3),
                'unlock_rps':12,
                'unlocked':false,
                'sid':'s4',
		            'img':'http://i.imgur.com/bRCwWBA.jpg',
            },
            '04_club':{
                'label':'Ft. Gox',
                'description':'Sell somewhat larger amounts of bitcoin on Fort Gox, but be careful that your account is not locked!',
                'amount':0,
                'risk':0,
                'rps':60,
                'base_cost':getClickerCost(4),
                'cost':getClickerCost(4),
                'unlock_rps':30,
                'unlocked':false,
                'sid':'s5',
		            'img':'http://i.imgur.com/tdQD9mi.png',
            },
            '05_cartel':{
                'label':'Bytestamp',
                'description':'Sell large amounts of bitcoin through Bytestamp.',
                'amount':0,
                'rps':100,
                'risk':.1,
                'base_cost':getClickerCost(5),
                'cost':getClickerCost(5),
                'unlock_rps':100,
                'unlocked':false,
                'sid':'s6',
		            'img':'http://i.imgur.com/I0lBeO8.png',
            },
            '07_dea':{
                'label':'Bitcoin City',
                'description':'A bitcoin city in which fiat is not allowed.  Tourists must buy bitcoins to enter, from you.',
                'amount':0,
                'risk':0.005,
                'rps':500,
                'base_cost':getClickerCost(6),
                'cost':getClickerCost(6),
                'unlock_rps':250,
                'unlocked':false,
                'sid':'s7',
		            'img':'http://i.imgur.com/hOhKz4u.png',
            },
            '09_diplomat':{
                'label':'Floating Bitcoin Island',
                'description':'Buy a large floating island and turn it into a bitcoin-based economic superpower.',
                'amount':0,
                'risk':0.1,
                'rps':3000,
                'base_cost':getClickerCost(7),
                'cost':getClickerCost(7),
                'unlock_rps':750,
                'unlocked':false,
                'sid':'s8',
		            'img':'http://i.imgur.com/A3hhV93.jpg',
            },
            '11_city_police':{
                'label':'Interplanetary Exploration',
                'description':'You discover sentient and intelligent beings living in a massive ' +
				                      'complex under the surface of Titan, the largest moon of Saturn.  They are ' +
					                    'extremely interested in the bitcoin concept and buy very large amounts of your coins.',
                'amount':0,
                'risk':0.1,
                'rps':20000,
                'base_cost':getClickerCost(8),
                'cost':getClickerCost(8),
                'unlock_rps':3900,
                'unlocked':false,
                'sid':'s9',
		            'img':'http://i.imgur.com/AOjzces.jpg',
            },
             'senator':{
                'label':'Solar-system-wide Bitcoin Exchanges',
                'description':'The discovery of intelligent beings on other worlds of the Sol ' +
                              'system, most notably Europa, the second moon of Jupiter, has led ' +
                              'to the creation of Solar-system-wide bitcoin exchanges.',
                'amount':0,
                'risk':0.005,
                'rps':100000,
                'base_cost':getClickerCost(9),
                'cost':getClickerCost(9),
                'unlock_rps':24500,
                'unlocked':false,
                'sid':'s10',
		            'img':'http://i.imgur.com/wpwFN6y.jpg',
            },
            'big_cartel':{
                'label':'Bitcoin Religion',
                'description':'Some devotees of bitcoin have started a religion.  To join, ' +
                'prospective members must exchange their life savings to bitcoin.',
                'amount':0,
                'risk':0.00000001,
                'rps':500000,
                'base_cost':getClickerCost(10),
                'cost':getClickerCost(10),
                'unlock_rps':125000,
                'unlocked':false,
                'sid':'s11',
		            'img':'http://i.imgur.com/wNrNRAT.jpg',
            },
            'dictator':{
                'label':'Alpha Centauri Bitcoin Exchanges',
                'description':'With faster-than-light travel perfected by Jovian scientists at the Europa ' +
                              'Scientific research station, interstellar travel becomes possible.  The first bitcoin ' +
                              'exchanges of the Alpha Centauri system are opening for business.',
                'amount':0,
                'risk':0.00000001,
                'rps':2000000,
                'base_cost':getClickerCost(11),
                'cost':getClickerCost(11),
                'unlock_rps':650000,
                'unlocked':false,
                'sid':'s12',
		            'img':'http://i.imgur.com/FLrg6wx.jpg',
            },
            'space_mules':{
                'label':'Andromeda Galaxy Bitcoin Exchanges',
                'description':'With tachyonic FTL technology developed by the government of Alpha Centauri, interstellar ' +
				                      'travel speed is increased tenfold and intergalactic travel becomes possible.  The first ' +
                              'bitcoin exchanges of the Andromeda galaxy are opening for business.',
                'amount':0,
                'risk':0.000000001,
                'rps':10000000,
                'base_cost':getClickerCost(12),
                'cost':getClickerCost(12),
                'unlock_rps':2750000,
                'unlocked':false,
                'sid':'s13',
		            'img':'http://i.imgur.com/w2QBqrS.gif',
            },
            'meth_mart':{
                'label':'Bitcoin becomes official currency of the Galactic American Empire',
                'description':'With your money, you are able to bribe the oligarchy ' +
                              'of the Galactic American Empire to decree its official currency bitcoin. ' +
					                    'The Galactic American Empire, known throughout the Universe for its continued ' +
					                    'use of the Imperial system of measurement, subjects its population of 300 sextillion ' +
					                    'to persecution if caught using any currency besides bitcoin.  Large amounts of your ' +
					                    'coin hoard are being continually bought.',
                'amount':0,
                'risk':0.55,
                'rps':75000000,
                'base_cost':getClickerCost(13),
                'cost':getClickerCost(13),
                'unlock_rps':13000000,
                'unlocked':false,
                'sid':'s14',
		            'img':'http://i.imgur.com/8e99gHS.gif'
            },

            'shuttle':{
                'label':'Time Machine',
                'description':'Through FTL travel, your team of researchers develops a method to ' +
                              'travel forward in time.  You manipulate the market to sell your bitcoin '+
                              'for exorbitantly high prices.',
                'amount':0,
                'risk':0.000001,
                'rps':500000000,
                'base_cost':getClickerCost(14),
                'cost':getClickerCost(14),
                'unlock_rps':90000000,
                'unlocked':false,
                'sid':'s15',
		            'img':'http://i.imgur.com/7AKrLNa.jpg',
            },
            's_meth_relay':{
                'label':'King of the Universe',
                'description':'With your bitcoins, you have gained power within the galaxy. ' +
                              'You are in control of the galaxy\'s finanicial systems, and ' +
                              'your 283 septillion subjects buy bitcoins at your command.',
                'amount':0,
                'risk':0.000001,
                'rps':5000000000,
                'base_cost':getClickerCost(15),
                'cost':getClickerCost(15),
                'unlock_rps':600000000,
                'unlocked':false,
                'sid':'s16',
		            'img':'http://i.imgur.com/RdAahJm.jpg',
            },
            's_church':{
                'label':'God',
                'description':'You exist on a separate temporal plane of the Universe, with the ability ' +
                              'to manipulate space, matter, and time.  Your riches are unimaginable and ' +
                              'your influence extends across the entirety of existence.',
                'amount':0,
                'risk':0.1,
                'rps':50000000000,
                'base_cost':getClickerCost(16),
                'cost':getClickerCost(16),
                'unlock_rps':7500000000,
                'unlocked':false,
                'sid':'s17',
		            'img':'http://i.imgur.com/MlR41am.jpg',
            },
        },


        'upgrades':{

            '00_air_fresheners':{
                'label':'More Efficient Mining',
                'description':'Your equipment is upgraded, you can mine an extra bitcoin at a time.',
                'action':'make_amount',
                'purchased':false,
                'mod':1,
                'cost':10,
                'prereq':null,
                'sid':'u01',
            },
            '01_exhaust_fan':{
                'label':'Even More Efficient Mining',
                'description':'Your equipment is upgraded again, now you can mine five more bitcoins at a time!',
                'action':'make_amount',
                'purchased':false,
                'mod':5,
                'cost':100,
                'prereq':'00_air_fresheners',
                'sid':'u02',
            },
            '02_goatee':{
                'label':'Goatee',
                'description':'Your mighty goatee intimidates buyers into buying more bitcoins; you can now exchange an extra bitcoin at a time.',
                'action':'sell_amount',
                'purchased':false,
                'mod':1,
                'cost':10,
                'prereq':null,
                'sid':'u03',
            },
            '03_hvac':{
                'label':'More Reliable Internet Connection',
                'description':'You upgrade your internet connection, you can now mine 100 more bitcoins at a time.',
                'action':'make_amount',
                'purchased':false,
                'mod':100,
                'cost':11050,
                'prereq':'01_exhaust_fan',
                'sid':'u04',
            },
            '04_glasses':{
                'label':'Prescription Glasses',
                'description':'Your nerdy specs make your buyers feel they can trust you more; you can now sell 5 additional bitcoins at a time',
                'action':'sell_amount',
                'purchased':false,
                'mod':5,
                'cost':100,
                'prereq':'02_goatee',
                'sid':'u05',
            },
            '07_hat': {
                'label':'Large Industrial Cooling System',
                'description':'This cooling system prevents your equipment from overheating, allowing you to mine an extra 50 bitcoins at a time.',
                'action':'make_amount',
                'purchased':false,
                'mod':50,
                'cost':500,
                'prereq':'04_glasses',
                'sid':'u06',
            },
            '08_mariachi_band':{
                'label':'Trade Fee',
                'description':'You start charging a fee to people who want to buy bitcoins, due to large demand. '
    				+ 'You charge an extra $5 per bitcoin.',
                'action':'widget_roi',
                'purchased':false,
                'mod':5,
                'cost':17500,
                'prereq':'07_hat',
                'sid':'u07',
            },
            '09_vats':{
                'label':'Extremely Efficient Mining',
                'description':'Your click-mining powers are now very efficient, allowing you to mine an additional 500 bitcoins at a time.',
                'action':'make_amount',
                'purchased':false,
                'mod':500,
                'cost':4507500,
                'prereq':'08_mariachi_band',
                'sid':'u08',
            },

            '11_dealer_business_cards':{
                'label':'Increase Bitcoin Price',
                'description':'Increase bitcoin price by fifty cents',
                'cost':30,
                'action':'widget_roi',
                'mod':0.5,
                'purchased':false,
                'prereq':null,
                'sid':'u09',
            },
            '13_spinning_rims':{
                'label':'Increase Bitcoin Price',
                'description':'Increase bitcoin price by fifty cents',
                'action':'widget_roi',
                'purchased':false,
                'mod':0.5,
                'cost':250,
                'prereq':'11_dealer_business_cards',
                'sid':'u10',
            },
            'dealer_slacks':{
                'label':'Large Influx of Forum Members',
                'description':'Large numbers of people are registering accounts on the bitcoin forum, allowing you '
				    + 'to exchange 2 more bitcoins at a time.',
                'action':'sellers.03_drug_mule.rps',
                'purchased':false,
                'mod':2,
                'cost':550,
                'prereq':'13_spinning_rims',
                'sid':'u11',
            },
            'mules_1': {
                'label':'Rich Forum Members',
                'description':'A large number of affluent people are registering an account '
				    + 'on the bitcoin forum, allowing you to exchange 4 more bitcoins at a time.',
                'action':'sellers.03_drug_mule.rps',
                'purchased':false,
                'mod':4,
                'cost':1250,
                'prereq':'dealer_slacks',
                'sid':'u12',
            },
            'mules_2': {
                'label':'Wall Street Bankers Registering on the Bitcoin Forum',
                'description':'Wall Street bankers are registering on the bitcoin forum to buy coins, allowing '
				    + 'you to exchange an extra sixteen bitcoins at a time on the forums.',
                'action':'sellers.03_drug_mule.rps',
                'purchased':false,
                'mod':16,
                'cost':55000,
                'prereq':'mules_1',
                'sid':'u13',
            },
            'dealer_guns': {
                'label':'More Local Contacts',
                'description':'More contacts are being introduced into your bitcoin network, so your contacts buy an extra 0.5 bitcoin per second.',
                'action':'sellers.01_dealer.rps',
                'purchased':false,
                'mod':0.5,
                'cost':8000,
                'prereq':'dealer_slacks',
                'sid':'u14',
            },
            'van_jingle':{
                'label':'Quicker Coinbase',
                'description':'Coinbase guarantees that your transaction will be processed quickly, allowing you to exchange 5 more bitcoins at a time with Coinbase',
                'action':'sellers.drug_van.rps',
                'purchased':false,
                'mod':5,
                'cost':16000,
                'prereq':'dealer_guns',
                'sid':'u15',
            },
            'lawyers_sleaze': {
                'label':'Larger Precious Metals Dealer Accepting Bitcoin',
                'description':'A larger precious metals dealer begins accepting bitcoin as payment, '
				    + 'allowing you to exchange 10 more at a time when you exchange bitcoins for precious metals.',
                'action':'sellers.cheap_lawyer.rps',
                'purchased':false,
                'mod':10,
                'cost':150000,
                'prereq':'van_jingle',
                'sid':'u16',
            },
            'lawyers_better':{
                'label':'Accredited Precious Metals Dealer',
                'description':'Your precious metals dealers are now accredited, reducing risk of losing bitcoins by an additional 5%.',
                'action':'sellers.cheap_lawyer.risk',
                'purchased':false,
                'mod':-0.05,
                'cost':1175000,
                'prereq':'lawyers_sleaze',
                'sid':'u17',
            },
            'lawyers_best':{
                'label':'Major Precious Metals Dealer Now Accepting Bitcoin',
                'description':'The largest precious metals dealers are now accepting bitcoin as payment, allowing you to exchange an '
				    + 'additional 25 bitcoins at a time when exchanging for precious metals.',
                'action':'sellers.cheap_lawyer.rps',
                'purchased':false,
                'mod':25,
                'cost':11275000,
                'prereq':'lawyers_better',
                'sid':'u18',
            },
            'lawyers_super':{
                'label':'Palladium and Iridium',
                'description':'High demand for precious metals palladium and iridium have allowed your '
				    +'precious metals dealer to expand, they can now exchange an additional 50 bitcoins at a time',
                'action':'sellers.cheap_lawyer.rps',
                'purchased':false,
                'mod':50,
                'cost':210555000,
                'prereq':'lawyers_best',
                'sid':'u19',
            },
            'lawyers_magic':{
                'label':'Radioactive Metals',
                'description':'The North Korean and Russian state both are in need of high '
				    +  'amounts of Uranium and Plutonium.  Luckily, your dealer has both metals. '
    			    +  'Your dealers now exchange an additional 100 bitcoins at a time.',
                'action':'sellers.cheap_lawyer.rps',
                'purchased':false,
                'mod':100,
                'cost':164200552000,
                'prereq':'lawyers_super',
                'sid':'u20',
            },
            'better_diplomats': {
                'label':'Island Expansion',
                'description':'Your islands have grown in terms of tourism, allowing them to sell an extra 1K batches at a time.',
                'action':'sellers.09_diplomat.rps',
                'purchased':false,
                'mod':1000,
                'cost':15005000,
                'prereq':'lawyers_sleaze',
                'sid':'u21',
            },
            '21_portable_generator':{
                'label':'Overclock Celeron CPUs',
                'description':'Overclock your Celeron CPUs, allowing them to mine 2 more bitcoins per second.',
                'action':'clickers.03_used_rv.rps',
                'purchased':false,
                'mod':2,
                'cost':150,
                'prereq':'01_exhaust_fan',
                'sid':'u22',
            },
            'shed_power':{
                'label':'Overclock Pentium 4.',
                 'description':'Overclock your Pentium 4s, allowing them to mine another 0.8 batches at a time',
                'action':'clickers.01_storage_shed.rps',
                'purchased':false,
                'mod':0.8,
                'cost':9500,
                'prereq':'21_portable_generator',
                'sid':'u23',
            },
            'rv_solar':{
                'label':'Celeron Solar Power',
                'description':'Harness the power of the sun! Allows your Celeron CPUs to mine an extra 2.5 bitcoins at a time',
                'action':'clickers.03_used_rv.rps',
                'purchased':false,
                'mod':2.5,
                'cost':1250,
                'prereq':'shed_power',
                'sid':'u24',
            },
            'camper_lab':{
                'label':'Dangerously Overclocked Celerons',
                'description':'Completely overclock your Celeron CPUs for maximum bitcoin mining performance, allowing them '
				    + 'to mine an extra SIXTEEN bitcoins at a time',
                'action':'clickers.03_used_rv.rps',
                'purchased':false,
                'mod':16,
                'cost':55000,
                'prereq':'rv_solar',
                'sid':'u25',
            },
            '22_hazmat_suit':{
                'label':'Volcano Suit',
                'description':'Now you can mine without regard to the extreme heat emanating from your equipment. '
                    + 'Make an additional 100 bitcoins at a time!',
                'action':'make_amount',
                'purchased':false,
                'mod':100,
                'cost':15000,
                'prereq':'04_glasses',
                'sid':'u26',
            },

            '23_personal_enforcer':{
                'label':'Personal Enforcer',
                'description':'Hire a personal enforcer to prevent your cash from getting stolen, you can now sell an extra 100 bitcoins at a time',
                'action':'sell_amount',
                'purchased':false,
                'mod':100,
                'cost':15000,
                'prereq':'22_hazmat_suit',
                'sid':'u27',
            },

            '31_electric_hotplate':{
                'label':'Dorm Room',
                'description':'Your mining base.',
                'action':null,
                'purchased':true,
                'mod':0,
                'cost':25,
                'prereq':null,
                'sid':'u28',
            },
            '32_gas_stove':{
                'label':'Increase Bitcoin Price',
                'description':'Increase bitcoin price by fifty cents',
                'cost':30,
                'action':'widget_roi',
                'mod':0.5,
                'purchased':false,
                'prereq':null,
                'sid':'u29',
            },
            '33_steel_burner':{
                'label':'Increase Bitcoin Price',
                'description':'Increase bitcoin price a further one dollar.',
                'cost':240,
                'action':'widget_roi',
                'mod':0.5,
                'purchased':false,
                'prereq':'32_gas_stove',
                'sid':'u30',
            },
            '34_titanium_burner':{
                'label':'Media Attention',
                'description':'Larger media attention to bitcoin increases its price by two dollars.',
                'cost':3550,
                'action':'widget_roi',
                'mod':2,
                'purchased':false,
                'prereq':'33_steel_burner',
                'sid':'u31',
            },
            '35_platinum_burner':{
                'label':'Small Retailers Begin Accepting Bitcoin',
                'description':'Small retailers begin accepting bitcoin, increasing its value by three dollars.',
                'cost':23550,
                'action':'widget_roi',
                'mod':3,
                'purchased':false,
                'prereq':'34_titanium_burner',
                'sid':'u32',
            },
            '41_cheap_cookware':{
                'label':'Electricity',
                'description':'Used for mining.',
                'cost':20,
                'action':null,
                'mod':0,
                'purchased':true,
                'prereq':null,
                'sid':'u33',
            },
            '42_steel_cookware':{
                'label':'Increase Bitcoin Price',
                'description':'Increase bitcoin price by one dollar',
                'cost':50,
                'action':'widget_roi',
                'mod':1,
                'purchased':false,
                'prereq':null,
                'sid':'u34',
            },
            '43_glass_flasks':{
                'label':'All-Time High',
                'description':'Bitcoin reaches an all-time high!  Its value increases by one dollar.',
                'cost':240,
                'action':'widget_roi',
                'mod':1,
                'purchased':false,
                'prereq':'42_steel_cookware',
                'sid':'u35',
            },
            '46_hard_glass_boilers':{
                'label':'Increase Bitcoin Price',
                'description':'Further increases bitcoin price by one dollar.',
                'cost':1500,
                'action':'widget_roi',
                'mod':1,
                'purchased':false,
                'prereq':'43_glass_flasks',
                'sid':'u36',
            },

            '47_carbon_filters':{
                'label':'Bitcoin Price Increase',
                'description':'Bitcoin value increases by $3',
                'cost':92500,
                'action':'widget_roi',
                'mod':3,
                'purchased':false,
                'prereq':'46_hard_glass_boilers',
                'sid':'u37',
            },
            '49_diamond_flasks':{
                'label':'All-Time High! (Again)',
                'description':'Bitcoin is almost $25!  I don\'t think it\'ll get this high ever again, though.',
                'cost':252500,
                'action':'widget_roi',
                'mod':5,
                'purchased':false,
                'prereq':'46_hard_glass_boilers',
                'sid':'u38',
            },
            '50_platinum_boilers':{
                'label':'Whoa!  Over $30 per Bitcoin!',
                'description':'Bitcoin price increases by $10!',
                'cost':2155000,
                'action':'widget_roi',
                'mod':10,
                'purchased':false,
                'prereq':'49_diamond_flasks',
                'sid':'u39',
            },
            '53_space_hazmat':{
                'label':'Space Station',
                'description':'Now you can mine in space! Mine an additional 1000 batches per click.',
                'cost':121550000,
                'action':'make_amount',
                'mod':1000,
                'purchased':false,
                'prereq':'50_platinum_boilers',
                'sid':'u40',
            },
            'personal_snipers':{
                'label':'SWAT Snipers',
                'description':'Your team of highly trained snipers protects you during high-value transactions. Safely sell an additional 1000 bitcoins at a time',
                'cost':321500000,
                'action':'sell_amount',
                'mod':1000,
                'purchased':false,
                'prereq':'50_platinum_boilers',
                'sid':'u41',
            },
            'chem_degree':{
                'label':'Cryptography Doctorate',
                'description':'By ordering this online degree, you find an fundemental flaw '
                    + 'in the SHA-256 encryption protocol.  You are now able to mine an extra '
					+ '50% of your current rate.',
                'cost':4500750000,
                'action':'make_rps_multiplier',
                'mod':0.5,
                'purchased':false,
                'prereq':'53_space_hazmat',
                'sid':'u42',
            },
            'mech_suit':{
                'label':'Mech Suit',
                'description':'Your mech suit keeps you safe while making deals. '
                    + 'Sell an additional 50% of bitcoins at a time',
                'cost':5100500000,
                'action':'sell_rps_multiplier',
                'mod':0.5,
                'purchased':false,
                'prereq':'personal_snipers',
                'sid':'u43',
            },
            'slap_chop':{
                'label':'Lunar Datacenters',
                'description':'With these Lunar Datacenters, you can mine '
				    + 'an additional 50% of bitcoins at a time.',
                'cost':18100500000,
                'action':'make_rps_multiplier',
                'mod':0.5,
                'purchased':false,
                'prereq':'chem_degree',
                'sid':'u44',
            },
             'fearless':{
                'label':'Fearless',
                'description':'After facing death so many times, '
                    +'you no longer have a sense of self preservation. '
                    +'Sell another 50% of bitcoins at a time',
                'cost':20100500000,
                'action':'sell_rps_multiplier',
                'mod':0.5,
                'purchased':false,
                'prereq':'mech_suit',
                'sid':'u45',
            },
            'better_genetics':{
                'label':'Matter Replication Device',
                'description':'Hire every scientist on the planet to create a matter replication device. '
                    + 'Double your mining output.',
                'cost':3518100500000,
                'action':'make_rps_multiplier',
                'mod':1,
                'purchased':false,
                'prereq':'slap_chop',
                'sid':'u46',
            },
            'crack_bite':{
                'label':'Radioactive Lightning',
                'description':'After being struck by a bolt of radioactive '
                    + 'lightning, you\'ve gained super strength. Your manual sell rate is doubled.',
                'cost':3720100500000,
                'action':'sell_rps_multiplier',
                'mod':1,
                'purchased':false,
                'prereq':'fearless',
                'sid':'u47',
            },
            'u_trick_or_treat': {
                'label':'Trick or Treat',
                'description':'Hand out bitcoins like they\'re candy, and sell an additional 200% of bitcoins at a time',
                'action':'sell_rps_multiplier',
                'purchased':false,
                'mod':2,
                'hidden':true,
                'cost':15000000,
                'prereq':'hidden',
                'sid':'u47.1',
            },

            'ancient_methology': {
                'label':'Market Manipulation',
                'description':'With your wealth you are able to manipulate the bitcoin market easily, '
                    + 'increasing bitcoin prices by $10',
                'cost':820000000,
                'action':'widget_roi',
                'mod':10,
                'purchased':false,
                'prereq':'50_platinum_boilers',
                'sid':'u48',
            },
            'methylamine_secret': {
                'label':'Graphene Semiconductors',
                'description':'These graphene semiconductors double your manual mining output.',
                'cost':126321500000,
                'action':'make_rps_multiplier',
                'mod':1,
                'purchased':false,
                'prereq':'ancient_methology',
                'sid':'u49',
            },
  //            'alien_meth':{
  //                'label':'Meth of the Third Kind',
  //                'description':'Exta terrestrial meth purification processes '
  //                    + 'have been discovered on Mars. Increases purity by another 12 IPUs',
  //                'cost':2100320555000,
  //                'action':'widget_roi',
  //                'mod':12,
  //                'purchased':false,
  //                'prereq':'methylamine_secret',
  //                'sid':'u50',
  //            },
            'quantum_meth':{
                'label':'$100 per bitcoin',
                'description':'Bitcoin reaches $100, thanks to your market manipulation.',
                'cost':42100500555000,
                'action':'widget_roi',
                'mod':56,
                'purchased':false,
                'prereq':'methylamine_secret',
                'sid':'u50.1',
            },
            'u_holy_meth':{
                'label':'$300 per bitcoin',
                'description':'Bitcoin fever is infecting the world! '
                    + 'The exchange rate increases by $200.',
                'cost':142100500555000,
                'action':'widget_roi',
                'mod':200,
                'purchased':false,
                'prereq':'quantum_meth',
                'sid':'u50.2',
            },
            'u_angelic':{
                'label':'$500 per bitcoin',
                'description':'Investors see the price increases from your '
                    + 'market manipulation, and buy in large amounts.',
                'cost':1042100500555000,
                'action':'widget_roi',
                'mod':200,
                'purchased':false,
                'prereq':'u_holy_meth',
                'sid':'u50.3',
            },
            'u_venture_funding':{
                'label':'$800 per bitcoin',
                'description':'Venture capitalists start funding bitcoin '
                    + 'companies, sending the exchange rate up $300.',
                'cost':5042100500555000,
                'action':'widget_roi',
                'mod':300,
                'purchased':false,
                'prereq':'u_angelic',
                'sid':'u50.4',
            },
            'u_all_time':{
                'label':'$1242 per bitcoin',
                'description':'Bitcoin reaches an all-time high on '
                    + 'November 29, 2013.  Your assets played a large '
                    + 'role in this price increase of $442.',
                'cost':25042100500555000,
                'action':'widget_roi',
                'mod':442,
                'purchased':false,
                'prereq':'u_venture_funding',
                'sid':'u50.5',
            },
  //
  //            'u_nyme_1':{
  //                'label':'Insider Trading',
  //                'description':'Improves NYME laundering by $500m per second ',
  //                'cost':50020555000,
  //                'action':'banks.b_nyme.rps',
  //                'mod':500000000,
  //                'purchased':false,
  //                'prereq':'lawyers_sleaze',
  //                'sid':'u51',
  //            },
  //            'u_nyme_2': {
  //                'label':'Sleazy Brokers',
  //                'description':'These sleazy stock brokers help your NYME launder '
  //                    + 'an extra $1B per second',
  //                'cost':500320555000,
  //                'action':'banks.b_nyme.rps',
  //                'mod':1000000000,
  //                'purchased':false,
  //                'prereq':'u_nyme_1',
  //                'sid':'u52',
  //            },
            'donator_thanks':{
                'label':'Thank You',
                'description':'Thanks for donating, your meth is now worth $50 more per batch',
                'cost':321500000,
                'action':'widget_roi',
                'mod':50,
                'purchased':false,
                'prereq':'hidden',
                'sid':'u70',
            },
         },

        'achievements': {
            'hand_made_widgets_1': {
                'label':'This is kinda fun...',
                'description':'You\'ve click-mined your first bitcoin!',
                'property':'stats.hand_made_widgets',
                'required':1,
                'unlocked':false,
                'value':1,
                'group':10,
                'min_time':1,
                'sid':'a01',
            },
            'hand_made_widgets_2': {
                'label':'I see how this works',
                'description':'You\'ve click-mined 100 total bitcoins!',
                'property':'stats.hand_made_widgets',
                'required':100,
                'unlocked':false,
                'value':2,
                'group':11,
                'min_time':1,
                'sid':'a02',
            },
            'hand_made_widgets_3': {
                'label':'Click apprentice',
                'description':'You\'ve click-mined 1,000 total bitcoins!',
                'property':'stats.hand_made_widgets',
                'required':1000,
                'unlocked':false,
                'value':3,
                'group':12,
                'min_time':1,
                'sid':'a03',
            },
            'hand_made_widgets_4':{
                'label':'Click magician',
                'description':'You\'ve click-mined 100,000 total bitcoins!',
                'property':'stats.hand_made_widgets',
                'required':100000,
                'unlocked':false,
                'value':4,
                'group':13,
                'min_time':1,
                'sid':'a04',
            },
            'hand_made_widgets_5':{
                'label':'Clickity-splickity',
                'description':'You\'ve click-mined 1,000,000 total bitcoins!',
                'property':'stats.hand_made_widgets',
                'required':1000000,
                'unlocked':false,
                'value':5,
                'group':14,
                'min_time':1,
                'sid':'a05',
            },
            'hand_made_widgets_6':{
                'label':'I AM THE ONE WHO CLICKS',
                'description':'YOU are to be feared. You\'ve click-mined 100,000,000 total bitcoins!',
                'property':'stats.hand_made_widgets',
                'required':100000000,
                'unlocked':false,
                'value':6,
                'group':15,
                'min_time':1,
                'sid':'a06',
            },
            'total_cash_1': {
                'label':'In the mining business',
                'description':'You\'ve mined and exchanged your first $1,000',
                'property':'stats.total_cash',
                'required':1000,
                'unlocked':false,
                'value':1,
                'group':20,
                'min_time':1,
                'sid':'a07',
            },
			'total_cash_0': {
                'label':'SHA-256',
                'description':'You\'ve mined and exchanged your first $256,256',
                'property':'stats.total_cash',
                'required':256256,
                'unlocked':false,
                'value':1,
                'group':20,
                'min_time':1,
                'sid':'a98',
            },
            'total_cash_2': {
                'label':'In the money business',
                'description':'You\'ve mined and exchanged your first $1,000,000!',
                'property':'stats.total_cash',
                'required':1000000,
                'unlocked':false,
                'value':2,
                'group':21,
                'min_time':1,
                'sid':'a08',
            },
			'total_cash_99': {
                'label':'SHA-256 #2',
                'description':'You\'ve mined and exchanged your first $256,256,256',
                'property':'stats.total_cash',
                'required':256256256,
                'unlocked':false,
                'value':1,
                'group':21,
                'min_time':1,
                'sid':'a99',
            },
            'total_cash_3': {
                'label':'Billion with a B',
                'description':'You\'ve mined and exchanged your first $1,000,000,000',
                'property':'stats.total_cash',
                'required':1000000000,
                'unlocked':false,
                'value':3,
                'group':22,
                'min_time':1,
                'sid':'a09',
            },
			'total_cash_98': {
                'label':'SHA-256 #3',
                'description':'You\'ve mined and exchanged your first $256,256,256,256',
                'property':'stats.total_cash',
                'required':256256256256,
                'unlocked':false,
                'value':1,
                'group':22,
                'min_time':1,
                'sid':'a98',
            },
            'total_cash_4': {
                'label':'T-T-T-Trillion',
                'description':'You\'ve mined and exchanged your first $1 trillion',
                'property':'stats.total_cash',
                'required':1000000000000,
                'unlocked':false,
                'value':4,
                'group':23,
                'min_time':1,
                'sid':'a10',
            },
            'total_cash_5': {
                'label':'In the empire business',
                'description':'You\'ve mined and exchanged $1 quadrillion dollars!',
                'property':'stats.total_cash',
                'required':1000000000000000,
                'unlocked':false,
                'value':5,
                'group':24,
                'min_time':1,
                'sid':'a11',
            },

            'under_complex_1': {
                'label':'Gigahasher',
                'description':'You\'ve obtained your first ASIC',
                'property':'clickers.11_bot_s.amount',
                'required':1,
                'unlocked':false,
                'value':1,
                'group':200,
                'min_time':1,
                'sid':'a12',
            },
            'city_police_1': {
                'label':'Jupiter is Cool',
                'description':'You\'ve started interplanetary exploration!',
                'property':'sellers.11_city_police.amount',
                'required':1,
                'unlocked':false,
                'value':1,
                'group':210,
                'min_time':1,
                'sid':'a13',
            },
            'lab_1': {
                'label':'Graphics Processing Unit',
                'description':'You\'ve acquired your first GPU',
                'property':'clickers.09_lab.amount',
                'required':1,
                'unlocked':false,
                'value':1,
                'group':220,
                'min_time':1,
                'sid':'a14',
            },
            'moon_lab_1':{
                'label':'Terahasher',
                'description':'You\'ve acquired the highest-performance miner available to the general public.',
                'property':'clickers.12_moon_lab.amount',
                'required':1,
                'unlocked':false,
                'hidden':false,
                'value':1,
                'group':227,
                'min_time':1,
                'sid':'a15',
            },
            'satoshi_miner':{
                'label':'Satoshi',
                'description':'You\'ve found Satoshi!  Good detective work.',
                'property':'clickers.c_planet.amount',
                'required':1,
                'unlocked':false,
                'hidden':false,
                'value':1,
                'group':228,
                'min_time':1,
                'sid':'a16',
            },
            'a_spacecorp':{
                'label':'Secure your cash throughout the galaxy',
                'description':'You\'ve bought a Space Corp!',
                'property':'banks.b_spacecorp.amount',
                'required':1,
                'unlocked':false,
                'hidden':false,
                'value':1,
                'group':240,
                'min_time':1,
                'sid':'a21',
            },
            'a_playtime1':{
                'label':'A Minute of Your Time',
                'description':'You\'ve managed a bitcoin miner for 1 minute',
                'property':'stats.seconds_played',
                'required':60,
                'unlocked':false,
                'hidden':false,
                'value':1,
                'group':301,
                'min_time':1,
                'sid':'a22',
            },
            'a_playtime2':{
                'label':'Five Minutes of Fame',
                'description':'You\'ve managed a bitcoin miner for 5 minutes',
                'property':'stats.seconds_played',
                'required':300,
                'unlocked':false,
                'hidden':false,
                'value':2,
                'group':302,
                'min_time':1,
                'sid':'a23',
            },
            'a_playtime3':{
                'label':'Mining Hour',
                'description':'You\'ve managed a bitcoin miner for an hour',
                'property':'stats.seconds_played',
                'required':3600,
                'unlocked':false,
                'hidden':false,
                'value':3,
                'group':303,
                'min_time':1,
                'sid':'a24',
            },
            'a_playtime4':{
                'label':'Half a day down the drain',
                'description':'You\'ve managed a bitcoin miner for 12 hours',
                'property':'stats.seconds_played',
                'required':43200,
                'unlocked':false,
                'hidden':false,
                'value':5,
                'group':304,
                'min_time':1,
                'sid':'a25',
            },
            'a_playtime5':{
                'label':'Day Miner',
                'description':'You\'ve managed a mining empire for an entire day',
                'property':'stats.seconds_played',
                'required':86400,
                'unlocked':false,
                'hidden':false,
                'value':10,
                'group':305,
                'min_time':1,
                'sid':'a26',
            },
            'a_playtime6':{
                'label':'Pro Miner',
                'description':'You\'ve managed a mining empire for an entire week!',
                'property':'stats.seconds_played',
                'required':86400*5,
                'unlocked':false,
                'hidden':false,
                'value':10,
                'group':306,
                'min_time':1,
                'sid':'a27',
            },
            'a_playtime7':{
                'label':'Burnout',
                'description':'You\'ve managed a mining empire for a month! Dayum!',
                'property':'stats.seconds_played',
                'required':86400*30,
                'unlocked':false,
                'hidden':false,
                'value':10,
                'group':307,
                'min_time':1,
                'sid':'a28',
            },
            'a_spent_million':{
            	'label':'Kardashian',
            	'description':'You\'ve spent your first $1,000,000!',
            	'property':'stats.total_spent',
            	'required':1000000,
            	'unlocked':false,
            	'hidden':false,
            	'value':1,
            	'group':315,
            	'min_time':1,
            	'sid':'a29',
            },
            'a_spent_billion':{
            	'label':'Kanye',
            	'description':'You\'ve spent your first $1,000,000,000!',
            	'property':'stats.total_spent',
            	'required':1000000000,
            	'unlocked':false,
            	'hidden':false,
            	'value':5,
            	'group':316,
            	'min_time':1,
            	'sid':'a30',
            },
            'a_spent_trillion':{
            	'label':'The Fed',
            	'description':'You\'ve spent your first $1,000,000,000,000!',
            	'property':'stats.total_spent',
            	'required':1000000000000,
            	'unlocked':false,
            	'hidden':false,
            	'value':10,
            	'group':317,
            	'min_time':1,
            	'sid':'a31',
            },
            'a_spent_quadrillion':{
            	'label':'THE High Roller',
            	'description':'You\'ve spent your first $1 Quadrillion!',
            	'property':'stats.total_spent',
            	'required':1000000000000000,
            	'unlocked':false,
            	'hidden':false,
            	'value':15,
            	'group':318,
            	'min_time':1,
            	'sid':'a32',
            },
            'a_spent_quintillion':{
            	'label':'Fortune 1',
            	'description':'You\'ve spent your first $1 Quintillion!',
            	'property':'stats.total_spent',
            	'required':1000000000000000000,
            	'unlocked':false,
            	'hidden':false,
            	'value':25,
            	'group':319,
            	'min_time':1,
            	'sid':'a33',
            },
            'cheated_cash_1':{
                'label':'Counterfeiter',
                'description':'You\'ve hacked in some cash',
                'property':'stats.cheated_cash',
                'required':1,
                'unlocked':false,
                'hidden':true,
                'value':1,
                'group':230,
                'min_time':1,
                'sid':'a101',
            },
            'cheated_meth_1':{
                'label':'Bitcoins from nowhere',
                'description':'You\'ve hacked in some bitcoins!',
                'property':'stats.cheated_widgets',
                'required':1,
                'unlocked':false,
                'hidden':true,
                'value':1,
                'group':240,
                'min_time':1,
                'sid':'a102',
            },

        },

        'events': {
            'cash_found_small':{
                'chance':0.04,
                'action':'event_found_cash(60)',
            },
            'cash_found_med': {
                'chance':0.005,
                'action':'event_found_cash(240)',
            },
            'cash_found_large': {
                'chance':0.001,
                'action':'event_found_cash(640)',
            },
            'meth_found_small':{
                'chance':0.04,
                'action':'event_found_meth(120)',
            },
            'building_seized':{
                'chance':0.2,
                'action':'event_dea_seize_building()',
            },
            'cash_lost': {
                'chance':0.007,
                'action':'event_lose_cash(60)',
            },
            'rival_cash_lost': {
                'chance':0.005,
                'action':'event_rival_lose_cash(205)',
            },
            'pay_bribe':{
                'chance':0.01,
                'action':'event_pay_bribe(125)',
            },
            'lose_meth':{
                'chance':0.005,
                'action':'event_lose_meth(125)',
            },
            'irs_audit_1': {
                'chance':0.18,
                'action':'event_irs_audit(0.5)',
            },

        },

        'stats': {
            'seller_rps':0,
            'clicker_rps':0,
            'bank_rps':0,
            'cheated_widgets':0,
            'cheated_cash':0,
            'hand_made_widgets':0,
            'made_widgets':0,
            'sold_widgets':0,
            'hand_sold_widgets':0,
            'seconds_played':0,
            'bought_upgrades':0,
            'total_cash':0,
            'total_spent':0,
            'start_time':(new Date).getTime(),
        },
    };

    function getBankCost(level) {
      // level is indexed starting from 0
      bank_base_cost = 200;
      bank_factor = 40;
      return Math.round(bank_base_cost * Math.pow(bank_factor, level));
    }

    function getClickerCost(level) {
      // level is indexed starting from 0
      clicker_base_cost = 25;
      clicker_factor = 15;
      return Math.round(clicker_base_cost * Math.pow(clicker_factor, level));
    }

    this.error_log = function(msg) {
        error_log(msg, this.get_debug_data());
    }

    this.get_debug_data = function() {
        return {
            'cash':pd.cash.amount,
            'widgets':pd.widgets.amount,
            'safe_cash':pd.cash.safe,
            'make_amount':pd.make_amount,
            'sell_amount':pd.sell_amount,
        }
    }

    this.sec_tick = function() {
        fix_saved();
        fix_stats();
        check_achievements();
    }

    this.tick = function() {

        var this_tick = (new Date).getTime();
        var this_sub = 1000 / tick_ms;
        var ticks = Math.round((this_tick - last_tick) / tick_ms);
        if(ticks > 360000) {
            ticks = 360000;
        } else if (ticks < 1) {
            return;
        }
        last_tick = this_tick;

        if(pd.cash.amount < 0) {
            this.error_log('negative_cash: '+pd.cash.amount);
            pd.cash.amount = 0;
        }
        if(pd.widgets.amount < 0) {
            this.error_log('negative_widgets: '+pd.widgets.amount);
            pd.widgets.amount = 0;
        }
        if(pd.cash.safe < 0) {
            this.error_log('negative_safe_cash: '+pd.cash.safe);
            pd.cash.safe = 0;
        }

        var make_amount = 0;
        for(var k in pd.clickers) {
            var cl = pd.clickers[k];
            make_amount += cl.amount * cl.rps;
        }
        pd.stats.clicker_rps = make_amount;
        make_amount = make_amount / this_sub;
        do_make(make_amount * ticks);


        var sell_amount = 0;
        for(var k in pd.sellers) {
            var sl = pd.sellers[k];
            sell_amount += sl.amount * sl.rps;
        }
        pd.stats.seller_rps = sell_amount;
        sell_amount = sell_amount / this_sub;

        do_sell(sell_amount * ticks);

        var safe_amount = 0;
        for(var k in pd.banks) {
            var bn = pd.banks[k];
            safe_amount += bn.amount * bn.rps;
        }
        pd.stats.bank_rps = safe_amount;
        safe_amount = safe_amount / this_sub;
        pd.cash.safe += safe_amount * ticks;
        if(pd.cash.safe > pd.cash.amount) {
            pd.cash.safe = pd.cash.amount;
        }

        fix_display();
    }

    function earn_cash(n) {
        pd.cash.amount += n;
        return true;
    }

    function spend_cash(n) {
        if(n > (pd.cash.amount)) {
            return false;
        }
        pd.cash.amount -= n;
        pd.stats.total_spent += n;
        return true;
    }

    function get_risk() {
        var rsk = 0;
        for(var k in pd.clickers) {
            if(pd.clickers[k].risk) {
                rsk += pd.clickers[k].risk * pd.clickers[k].amount;
            }
        }
        for(var k in pd.sellers) {
            if(pd.sellers[k].risk) {
                rsk += pd.sellers[k].risk * pd.sellers[k].amount;
            }
        }
        return rsk;
    }

    function get_risk2() {
        if(pd.cash.amount <= 20000) {
            return 0;
        }
        if(pd.cash.safe > pd.cash.amount) {
            return 0;
        }
        return 0.5 - (pd.cash.safe / pd.cash.amount);
    }


    this.get_click_sell_amount = function() {
        return pd.sell_amount + (pd.stats.seller_rps * pd.sell_rps_multiplier);
    }

    this.get_click_make_amount = function() {
        return pd.make_amount + (pd.stats.clicker_rps * pd.make_rps_multiplier);
    }

    this.get_difficulty_multiplier = function() {
        var diff_time = (pd.stats.seconds_played / 5);
        return Math.pow(pd.difficulty_multiplier, diff_time);
    }

    this.get_widget_roi = function() {
        return pd.widget_roi;
    }

    this.get_title = function() {
        return pd.title;
    }
    this.dump_pd = function(key) {
        console.log(pd[key]);
    }
    function get_item_cost(scl) {
        var cst = ((scl.amount + 1) * scl.base_cost) * (scl.amount + 1);

        if((scl.amount + 1) > 10) {
            cst *= 2;
        }
        return cst;
    }

    function get_item_last_cost(scl) {
        var cst = ((scl.amount) * scl.base_cost) * (scl.amount);

        if(scl.amount > 10) {
            cst *= 2;
        }
        return cst;
    }

    function get_item_sell_value(scl) {
        return get_item_last_cost(scl) * (pd.sell_return * pd.economy_roi);
    }

    function get_safe_cash() {
        if(pd.cash.safe > pd.cash.amount) {
            return pd.cash.amount;
        } else {
            return pd.cash.safe;
        }
    }

    function get_unsafe_cash() {
        var unsafe = pd.cash.amount - pd.cash.safe;
        if(unsafe < 0) { unsafe = 0; }
        return unsafe;
    }

    function get_hex_from_int(n) {
        return n.toString(24);
    }
    function get_int_from_hex(s) {
        return parseInt(s, 24);
    }

    function pd_to_json() {


        var sv = {
            'cash':Math.round(pd.cash.amount),
            'cash_safe':Math.round(pd.cash.safe),
            'widgets':Math.round(pd.widgets.amount),
            'clickers':{},
            'sellers':{},
            'upgrades':{},
            'banks':{},
            'stats':pd.stats,
            'version':pd.version,
        };


        for(var k in pd.banks) {
            if(pd.banks[k].unlocked) {
                sv.banks[k] = {
                    'amount':pd.banks[k].amount,
                    'unlocked':pd.banks[k].unlocked,
                };
            }
        }

        for(var k in pd.clickers) {
            sv.clickers[k] = {
                'amount':pd.clickers[k].amount,
                'unlocked':pd.clickers[k].unlocked,
            };
        }

        for(var k in pd.sellers) {
            sv.sellers[k] = {
                'amount':pd.sellers[k].amount,
                'unlocked':pd.sellers[k].unlocked,
            };
        }

        for(var k in pd.upgrades) {
            sv.upgrades[k] = {
                'purchased':pd.upgrades[k].purchased,
            };
        }
        return sv;
    }
    function new_pd_to_json() {
        var sdata = {
            'c':get_hex_from_int(Math.round(pd.cash.amount)),
            'cs':get_hex_from_int(Math.round(pd.cash.safe)),
            'w':get_hex_from_int(Math.round(pd.widgets.amount)),
        };

        var unlockables = {
            "clickers":"cl",
            "sellers":"sl",
            "banks":"bn",
        };
        for(var k in unlockables) {
            var items = pd[k];
            var sk = unlockables[k];
            var tmpa = [];
            for(var ik in items) {
                if(items[ik].unlocked) {
                    tmpa.push(
                        items[ik].sid
                        + ":" +
                        get_hex_from_int(items[ik].amount)
                    );
                }
            }
            sdata[sk] = tmpa.join('|');
        }

        var tmpu = [];
        for(var k in pd.upgrades) {
            var u = pd.upgrades[k];
            if(u.purchased) {
                tmpu.push(u.sid);
            }
        }
        sdata['u'] = tmpu.join('|')

        var tmps = [];
        for(var k in pd.stats) {
            tmps.push(k+':'
                +get_hex_from_int(pd.stats[k])
            );
        }
        sdata['s'] = tmps.join('|');
        return sdata;
    }


    function ac_to_json() {

        var ac = [];
        for(var k in pd.achievements) {
            if(pd.achievements[k].unlocked) {
                ac.push(k);
            }
        }
        return ac;
    }

    function new_ac_to_json() {
        var ac = [];
        for(var k in pd.achievements) {
            if(pd.achievements[k].unlocked) {
                ac.push(pd.achievements[k].sid);
            }
        }
        return ac.join('|');
    }

    function update_save_from_pd() {
        localStorage.sv = JSON.stringify(pd_to_json());
        localStorage.ac = JSON.stringify(ac_to_json());
    }
    function new_update_save_from_pd() {
        localStorage.sv2 = Base64.encode(JSON.stringify(new_pd_to_json()));
        localStorage.ac2 = Base64.encode(JSON.stringify(new_ac_to_json()));
    }

    function update_pd_from_json(sv) {

        pd.cash.amount = sv.cash;
        if(sv.cash_safe) { pd.cash.safe = sv.cash_safe; }
        pd.widgets.amount = sv.widgets;
        $.extend(pd.stats, sv.stats);

        if(sv.banks) {
            for(var k in sv.banks) {
                if(pd.banks[k]) {
                    pd.banks[k].amount = sv.banks[k].amount;
                    pd.banks[k].unlocked = sv.banks[k].unlocked;
                }
            }
        }

        for(var k in sv.clickers) {
            if(pd.clickers[k]) {
                pd.clickers[k].amount = sv.clickers[k].amount;
                pd.clickers[k].unlocked = sv.clickers[k].unlocked;
            }
        }

        for(var k in sv.sellers) {
            if(pd.sellers[k]) {
                pd.sellers[k].amount = sv.sellers[k].amount;
                pd.sellers[k].unlocked = sv.sellers[k].unlocked;
            }
        }

        for(var k in sv.upgrades) {
            if(pd.upgrades[k]) {
                if(sv.upgrades[k].purchased) {
                    apply_upgrade(k);
                }
            }
        }
    }
    function new_update_pd_from_json(sv) {
        pd.cash.amount = get_int_from_hex(sv.c);
        if(sv.cs) { pd.cash.safe = get_int_from_hex(sv.cs); }
        pd.widgets.amount = get_int_from_hex(sv.w);

        var unlockables = {
            'banks':'bn',
            'clickers':'cl',
            'sellers':'sl',
        };

        for(var uk in unlockables) {
            var sk = unlockables[uk];
            if(sv[sk]) {
                var bns = sv[sk].split('|');
                for(var i=0; i<bns.length; i++) {
                    var bid = bns[i].split(':');
                    for(var k in pd[uk]) {
                        if(pd[uk][k].sid == bid[0]) {
                            pd[uk][k].amount = get_int_from_hex(bid[1]);
                            pd[uk][k].unlocked = true;
                        }
                    }
                }
            }
        }

        var upgs = sv.u.split('|');
        for(var k in pd.upgrades) {
            var upg = pd.upgrades[k];
            if(upgs.indexOf(upg.sid) > -1) {
                apply_upgrade(k);
            }
        }

        var svs = sv.s.split('|');
        for(var k in pd.stats) {
            for(var i=0; i<svs.length; i++) {
                var svsp = svs[i].split(':');
                if(svsp[0] == k) {
                   pd.stats[k] = get_int_from_hex(svsp[1]);
                }
            }
        }
    }

    function update_ac_from_json(ac) {

        for(var i=0; i<ac.length; i++) {
            if(pd.achievements[ac[i]]) {
                pd.achievements[ac[i]].unlocked = true;
            }
        }
    }
    function new_update_ac_from_json(ac) {
        ac = ac.split('|');
        for(var k in pd.achievements) {
            if(ac.indexOf(pd.achievements[k].sid) > -1) {
                pd.achievements[k].unlocked = true;
            }
        }
    }

    function update_pd_from_save() {

        if(localStorage.ac) {
            var ac = $.parseJSON(localStorage.ac);
            update_ac_from_json(ac);
        }

        if(localStorage.sv) {
            var sv = $.parseJSON(localStorage.sv);
            update_pd_from_json(sv);
        }
    }
    function new_update_pd_from_save() {

        if(localStorage.ac2) {
            var ac = $.parseJSON(Base64.decode(localStorage.ac2));
            new_update_ac_from_json(ac);
        }
        if(localStorage.sv2) {
            var sv = $.parseJSON(Base64.decode(localStorage.sv2));
            new_update_pd_from_json(sv);
        }
    }

    this.add_cash = function(n) {
        earn_cash(n);
        pd.stats.cheated_cash += n;
    }

    this.add_widgets = function(n) {
        pd.widgets.amount += n;
        pd.stats.cheated_widgets += n;
    }

    this.do_save = function() {

        new_update_save_from_pd();
        last_saved = 0;
        track_page_view('/game_save');
    }

    this.do_load = function() {
        if((localStorage.sv2)||(localStorage.ac2)) {

            new_update_pd_from_save();
            message('Game loaded!');
            track_page_view('/game_load');
        }
    }

    this.do_export = function() {
        var exdata = {
            'sv': new_pd_to_json(),
            'ac': new_ac_to_json()
        };
        var exdata_json = JSON.stringify(exdata);
        var exdata_base64 = Base64.encode(exdata_json);
        $('#impexp').val(exdata_base64);
        message('Game exported!');
    }
    this.do_import = function() {
        var imptxt = $('#impexp').val();
        if(!imptxt) {
            return false;
        }
        if(imptxt == 'THANK YOU!') {
            good_message('You have unlocked the "Thank You" hidden upgrade');
            apply_upgrade('donator_thanks');
            return;
        }
        var exdata_json = Base64.decode($.trim(imptxt));
        var exdata = $.parseJSON(exdata_json);
        new_update_ac_from_json(exdata.ac);
        new_update_pd_from_json(exdata.sv);
        message('Game imported!');
    }

    this.do_run = function() {
            var input = $('#console_input').val();
            if(!input) {
                return false;
            }
            else if(input == 'add cash') {
                    alert("Warning: When adding cash, please enter a positive, numeric value. \n Please note that you will not be eligible to be on the highscore list.");
                    var n = prompt("Enter the amount of cash (USD) to add.", "0");
                    n = Number(n);
                    if (n <= 0 || isNaN(n)) {
                    	alert("That ain't a positive number!");
                    }
                    else {
                    var r = confirm(n + " USD will be added to your balance");
    			if (r == true) {
    			    	earn_cash(n);
    			    	pd.stats.cheated_cash += n;
    			} else {
    		                alert("No cash will be added to your balance.");
    			}
                    }
            }
            else if(input == 'add bitcoin') {
                    alert("Warning: When adding bitcoin, please enter a positive, numeric value. \n Please note that you will not be eligible to be on the highscore list.");
                    var b = prompt("Enter the amount of bitcoin to add.", "0");
                    b = Number(b);
                    if (b <= 0 || isNaN(b)) {
                    	alert("That ain't a positive number!");
                    }
    		else {
                    var s = confirm(b + " bitcoin will be added to your wallet");
    			if (s == true) {
    			    	pd.widgets.amount += b;
            			pd.stats.cheated_widgets += b;
    			} else {
    		                alert("No bitcoin will be added to your wallet.");
    			}
                    }
            }
    }
    this.do_reset = function() {
        localStorage.removeItem("sv2");
        message('Game reset');
        track_page_view('/game_reset');
        location.reload();
    }
    this.do_reset_all = function() {
        localStorage.clear();
        message('Game reset - all');
        track_page_view('/game_reset_all');
        location.reload();
    }

    this.do_reset_confirm = function() {
        var ok = confirm('Are you sure? You\'ll lose everything '
            + 'except Achievements.');
        if(ok) {
            this.do_reset();
        }
    }
    this.do_reset_all_confirm = function() {
        var ok = confirm('Are you sure? You\'ll lose everything, '
            + 'including Achievements.');
        if(ok) {
            this.do_reset_all();
        }
    }

    function do_make(n) {
        pd.widgets.amount += n;
        pd.stats.made_widgets += n;
        return true;
    }

    this.do_make_click = function() {

        var nw = (new Date).getTime();
        if((nw - last_click) < 70) {
            return false;
        }
        last_click = nw;

        var amt = this.get_click_make_amount();
        if(do_make(amt)) {

            pd.stats.hand_made_widgets += amt;
            fix_make_sell();
        }
    }

    function do_sell(n) {
        if(pd.widgets.amount < 1) {
            return 0;
        }
        if(n > pd.widgets.amount) {
            n += (pd.widgets.amount - n);
            if(n < 1) {
                return 0;
            }
        }
        pd.stats.sold_widgets += n;
        pd.widgets.amount -= n;
        earn_cash(n * pd.widget_roi);
        pd.stats.total_cash += (n * pd.widget_roi);
        return n;
    }

    this.do_sell_click = function() {

        var nw = (new Date).getTime();
        if((nw - last_click) < 70) {
            return false;
        }
        last_click = nw;

        var sale = do_sell(this.get_click_sell_amount());
        if(sale) {

            pd.stats.hand_sold_widgets += sale;
            fix_make_sell();
            return sale;
        }
        return 0;
    }

    function get_widget_quality() {
        var keys = Object.keys(pd.widgets.qualities).sort(function(a,b){return a-b});
        for(var i=0; i<keys.length; i++) {
            var idx = keys[i];
            if(pd.widget_roi > idx) {
                continue;
            }
            return pd.widgets.qualities[idx];
        }
        return 'NA';
    }




    this.buy_bank = function(key) {
        var bn = pd.banks[key];
        if(!bn) {
            return error('Invalid bank key');
        }
        if(!spend_cash(bn.cost)) {
            return false;
        }
        bn.amount += 1;
        message('You have purchased a '+bn.label+' for $'+pretty_bigint(bn.cost));

        return true;
    }

    this.sell_bank = function(key) {
        var bn = pd.banks[key];
        if(bn.amount < 1) {
            return false;
        }
        var sell_val = get_item_sell_value(bn);
        earn_cash(sell_val);
        message('You sold a '+bn.label+' for $'+pretty_bigint(sell_val));

        bn.amount -= 1;
        return true;
    }

    this.buy_clicker = function(key) {
        var cl = pd.clickers[key];
        if(!spend_cash(cl.cost)) {
            return false;
        }
        cl.amount += 1;
        message('You have purchased a '+cl.label+' for $'+pretty_bigint(cl.cost));
        fix_clickers();

        return true;
    }

    this.sell_clicker = function(key) {
        var cl = pd.clickers[key];
        if(cl.amount < 1) {
            return false;
        }
        var sell_val = get_item_sell_value(cl);
        earn_cash(sell_val);
        message('You sold a '+cl.label+' for $'+pretty_bigint(sell_val));

        cl.amount -= 1;
        return true;
    }

    this.buy_seller = function(key) {
        var sl = pd.sellers[key];
        if(!spend_cash(sl.cost)) {
            return false;
        }
        sl.amount += 1;
        message('You have purchased a '+sl.label+' for $'+pretty_bigint(sl.cost));
        fix_sellers();

        return true;
    }

    this.sell_seller = function(key) {
        var sl = pd.sellers[key];
        if(sl.amount < 1) {
            return false;
        }
        var sell_val = get_item_sell_value(sl);
        earn_cash(sell_val);
        message('You sold a '+sl.label+' for $'+pretty_bigint(sell_val));

        sl.amount -= 1;
        return true;
    }

    this.buy_upgrade = function(key) {
        var upg = pd.upgrades[key];
        var unl = apply_upgrade(key);
        if(!unl) {
            return false;
        }
        if(!spend_cash(upg.cost)) {
            return false;
        }
        message('You have unlocked '+upg.label+' for $'+pretty_bigint(upg.cost));
        track_page_view('/game_buy_upgrade');
        fix_upgrades();
    }

    function apply_upgrade(key) {
        var upg = pd.upgrades[key];
        if(!upg) {
            return false;
        }
        if(upg.purchased) {
            return false;
        }
        upg.purchased = true;
        var act_parts = upg.action.split('.');
        if(act_parts.length == 1) {
            pd[act_parts[0]] += upg.mod;
        } else if(act_parts.length == 2) {
            pd[act_parts[0]][act_parts[1]] += upg.mod;
        } else if(act_parts.length == 3) {
            pd[act_parts[0]][act_parts[1]][act_parts[2]] += upg.mod;
        }

        return true;
    }

    function unlock_achievement(key) {
        var ac = pd.achievements[key];
        if(!ac) {
            return false;
        }
        if(ac.unlocked) {
            return false;
        }
        ac.unlocked = true;
        good_message('You have earned a new achievement: <em>'+ac.label+'</em>');
        return true;
    }



    function fix_display() {
        fix_unlocks();
        fix_clickers();
        fix_sellers();
        fix_upgrades();
        fix_make_sell();
        fix_title();
        fix_risk();
        fix_achievements();
        fix_banks();
        display_cheat(); // check if there are cheated btc/usd
    }

    function fix_achievements() {
        if(active_tab != 'achievements') {
            return false;
        }
        for(var k in pd.achievements) {
            var ac = pd.achievements[k];
            var el = $('#'+k);
            var el_lbl = $('#'+k+'_lbl');
            if((ac.hidden)&&(!ac.unlocked)) {
                el.addClass('hidden');
                continue;
            }
            if(ac.unlocked) {
                el.removeClass('hidden');
                el.removeClass('semi_trans');
                el_lbl.addClass('purchased');
                el.removeClass('locked');
                el.removeClass('panel-default');
                el.addClass('panel-success');
            } else {
                el.addClass('locked');
                el.addClass('semi_trans');
            }
        }

    }

    function fix_banks() {
        if(active_tab != 'banks') {
            return;
        }

        $('#bank_rps').html(pretty_bigint(pd.stats.bank_rps));
        $('#bank_total').html(pretty_bigint(pd.cash.safe));
        for(var k in pd.banks) {
            var bn = pd.banks[k];
            bn.cost = get_item_cost(bn);
            var el = $('#'+k);
            var el_btn = $('#'+k+'_btn');
            var el_sell_btn = $('#'+k+'_sell_btn');
            var el_lbl = $('#'+k+'_lbl');
            var el_cst = $('#'+k+'_cst');
            var el_amt = $('#'+k+'_amt');
            var el_rps = $('#'+k+'_rps');

            el_amt.html(pretty_int(bn.amount));
            el_cst.html(pretty_bigint(bn.cost));
            el_rps.html(pretty_bigint(bn.rps));

            if((!bn.unlocked)) {
                el.addClass('hidden');
                continue;
            }

            if(pd.cash.amount < bn.cost) {
                el_btn.attr('disabled',true);
            } else {
                el_btn.attr('disabled',false);
            }

            if(bn.amount < 1) {
                el_sell_btn.attr('disabled',true);
            } else {
                el_sell_btn.attr('disabled',false);
            }

            el.removeClass('hidden');
        }
    }

    function fix_risk() {
        pd.risk_amount = get_risk();
        pd.risk2_amount = get_risk2();
        $('#risk_amount').html(pretty_int(pd.risk_amount * 100));
        $('#risk2_amount').html(pretty_int(pd.risk2_amount * 100));
        var el_lvl = $('#risk_level');
        var el_lvl2 = $('#risk2_level');
        var slvl = false;
        var slvl2 = false;
        for(var i=0; i<pd.risk_levels.length; i++) {
            if((pd.risk_amount < pd.risk_levels[i].level) && (!slvl)) {
                el_lvl.html(pd.risk_levels[i].label);
                slvl = true;
            }
            if((pd.risk2_amount < pd.risk_levels[i].level) && (!slvl2)) {
                el_lvl2.html(pd.risk_levels[i].label);
                slvl2 = true;
            }
        }

    }

    function fix_saved() {
        last_saved += 1;
        $('#last_saved').html('Game saved '+last_saved+' seconds ago');
    }

    function fix_title() {
        document.title = '$'+pretty_bigint(pd.cash.amount)+' | '+pd.title;
    }

    function fix_btc_cheat() {
	if (pd.stats.cheated_widgets <= 0)  { // no cheated BTC
            $('#cheatBTCsmall').hide();
        }
    }

    function fix_cash_cheat() {
	if (pd.stats.cheated_cash <= 0) { // no cheated cash
            $('#cheatUSDsmall').hide();
        }
    }

    function display_cheat() {
	fix_cash_cheat();
	fix_btc_cheat();
    }

    function fix_make_sell() {
        $('#sell_btn').html(pd.cash.action_label);
        $('#sell_lbl').html(pd.cash.label);
        $('#sell_amt').html(pretty_int(pd.cash.amount));
        $('#sell_roi').html(pd.widget_roi.toFixed(2));
        $('#safe_cash').html(pretty_int(get_safe_cash()));
        $('#cheated_cash').html(pretty_int(pd.stats.cheated_cash));
        $('#cheated_bitcoins').html(pretty_int(pd.stats.cheated_widgets));
        var sell_rate = pd.stats.seller_rps;
        if((pd.stats.seller_rps > pd.stats.clicker_rps)&&(pd.widgets.amount < pd.stats.seller_rps)) {
            sell_rate = pd.stats.clicker_rps;
        }
        $('#seller_rps').html(pretty_int(sell_rate * pd.widget_roi));
        $('#make_btn').html(pd.widgets.action_label);
        $('#make_lbl').html(pd.widgets.label);
        $('#make_amt').html(pretty_int(pd.widgets.amount));
        $('#make_qlt').html(get_widget_quality());
        $('#clicker_rps').html(pretty_int(pd.stats.clicker_rps-pd.stats.seller_rps));
        $('#clicker_rps_g').html(pretty_int(pd.stats.clicker_rps));
    }

    function fix_clickers() {
        if(active_tab != 'clickers') {
            return false;
        }
        for(var k in pd.clickers) {
            var el = $('#'+k);
            var el_btn = $('#'+k+'_btn');
            var el_sell_btn = $('#'+k+'_sell_btn');
            var el_amt = $('#'+k+'_amt');
            var el_cst = $('#'+k+'_cst');
            var el_rps = $('#'+k+'_rps');
            var el_rsk = $('#'+k+'_rsk');

            var cl = pd.clickers[k];
            if(cl.amount > 0) {
                el_sell_btn.attr('disabled', false);
            } else {
                el_sell_btn.attr('disabled', true);
            }

            cl.cost = get_item_cost(cl);

            if(cl.cost > pd.cash.amount) {
                el_btn.attr('disabled', true);
            } else {
                el_btn.attr('disabled', false);
            }
            if(!cl.unlocked) {
                el.addClass('hidden');
            } else {
                el.removeClass('hidden');
            }
            el_cst.html(pretty_bigint(cl.cost));
            el_amt.html(pretty_int(cl.amount));
            el_rps.html(pretty_bigint(cl.rps));
            el_rsk.html(pretty_int(cl.risk * 100));
        }
    }

    function fix_sellers() {
        if(active_tab != 'sellers') {
            return;
        }
        for(var k in pd.sellers) {
            var el = $('#'+k);
            var el_btn = $('#'+k+'_btn');
            var el_sell_btn = $('#'+k+'_sell_btn');
            var el_amt = $('#'+k+'_amt');
            var el_cst = $('#'+k+'_cst');
            var el_rps = $('#'+k+'_rps');
            var el_rsk = $('#'+k+'_rsk');

            var sl = pd.sellers[k];

            if(sl.amount < 1) {
                el_sell_btn.attr('disabled', true);
            } else {
                el_sell_btn.attr('disabled', false);
            }

            sl.cost = get_item_cost(sl);

            if(sl.cost > pd.cash.amount) {
                el_btn.attr('disabled', true);
            } else {
                el_btn.attr('disabled', false);
            }
            if(!sl.unlocked) {
                el.addClass('hidden');
            } else {
                el.removeClass('hidden');
            }
            el_cst.html(pretty_bigint(sl.cost));
            el_amt.html(pretty_int(sl.amount));
            el_rps.html(pretty_bigint(sl.rps));
            el_rsk.html(pretty_int(sl.risk * 100));
        }
    }

    function fix_unlocks() {

        var cl_unl = 0;
        var cl_tot = 0;
        for(var k in pd.clickers) {
            cl_tot += 1;
            var cl = pd.clickers[k];
            if(cl.unlock_rps <= pd.stats.seller_rps) {
                cl.unlocked = true;
                cl_unl += 1;
            }
        }
        $('#clickers_unlocked').html(pretty_int(cl_unl));
        $('#clickers_total').html(pretty_int(cl_tot));

        var sl_unl = 0;
        var sl_tot = 0;
        for(var k in pd.sellers) {
            sl_tot += 1;
            var sl = pd.sellers[k];
            if(sl.unlock_rps <= pd.stats.seller_rps) {
                sl_unl += 1;
                sl.unlocked = true;
            }
        }
        $('#sellers_unlocked').html(pretty_int(cl_unl));
        $('#sellers_total').html(pretty_int(cl_tot));

        var bn_unl = 0;
        var bn_tot = 0;
        for(var k in pd.banks) {
            bn_tot += 1;
            var bn = pd.banks[k];
            if((bn.unlock_rps <= pd.stats.seller_rps)||(bn.unlocked)) {
                bn_unl += 1;
                bn.unlocked = true;
            }
        }
        $('#banks_total').html(pretty_int(bn_tot));
        $('#banks_unlocked').html(pretty_int(bn_unl));

        var ac_unl = 0;
        var ac_tot = 0;
        for(var k in pd.achievements) {
            var ac = pd.achievements[k];
            if((!ac.unlocked)&&(ac.hidden)) {
                continue;
            }
            if(ac.unlocked) {
                ac_unl += 1;
            }
            ac_tot += 1;
        }
        $('#achievements_unlocked').html(pretty_int(ac_unl));
        $('#achievements_total').html(pretty_int(ac_tot));

    }

    function fix_upgrades() {
        var up_tot = 0;
        var up_unl = 0;
        for(var k in pd.upgrades) {
            var el = $('#'+k);
            var el_btn = $('#'+k+'_btn');
            var el_cst = $('#'+k+'_cst');
            var upg = pd.upgrades[k];

            if((upg.prereq)) {
                var req = pd.upgrades[upg.prereq];
                if((req)&&(!req.purchased)) {
                    up_tot += 1;
                    el.addClass('hidden');
                    continue;
                }
            }

            if((upg.prereq == 'hidden')&&(!upg.purchased)) {
                el.addClass('hidden');
                continue;
            } else {
                up_tot += 1;
            }

            if(upg.purchased) {
                el_btn.addClass('hidden');
                $('#'+k+'_lbl').addClass('purchased');
                el_cst.html('&#10004;');
                up_unl += 1;
            } else {
                el_cst.html('$'+pretty_bigint(upg.cost));
            }
            if(pd.cash.amount < upg.cost) {
                el_btn.attr('disabled', true);
            } else {
                el_btn.attr('disabled', false);
            }
            el.removeClass('hidden');
        }
        $('#upgrades_unlocked').html(pretty_int(up_unl));
        $('#upgrades_total').html(pretty_int(up_tot));
    }


    function fix_stats() {
        pd.stats.seconds_played += 1;
        pd.stats.bought_upgrades = 0;
        for(var k in pd.upgrades) {
            if(pd.upgrades[k].purchased) {
                pd.stats.bought_upgrades += 1;
            }
        }

        if(active_tab != 'misc') { return; }
        $('#hand_made_widgets').html(pretty_bigint(pd.stats.hand_made_widgets));
        $('#made_widgets').html(pretty_bigint(pd.stats.made_widgets));
        $('#sold_widgets').html(pretty_bigint(pd.stats.sold_widgets));
        $('#hand_sold_widgets').html(pretty_bigint(pd.stats.hand_sold_widgets));
        $('#total_cash').html(pretty_bigint(pd.stats.total_cash));
        $('#total_spent').html(pretty_bigint(pd.stats.total_spent));
        $('#bought_upgrades').html(pretty_int(pd.stats.bought_upgrades));
        $('#time_played').html(pretty_int(pd.stats.seconds_played));
        $('#click_sell_amount').html(pretty_int(pd.sell_amount));
        $('#click_make_amount').html(pretty_int(pd.make_amount));
    }



    this.setup_display = function() {
        setup_clickers();
        setup_sellers();
        setup_upgrades();
        setup_banks();
        setup_achievements();
    }

    function setup_achievements() {
       var sortlist = [];
        for(var k in pd.achievements) {
            sortlist.push([k, pd.achievements[k].group]);
        }
        var sorted = sortlist.sort(function(x,y) { return x[1] - y[1] });
        var ac_el = $('#achievements');
        ac_el.html('');

        for(var i in sorted) {
            var k = sorted[i][0];
            var ac = pd.achievements[k];
            var template = $('#tpl_achievement').html();
            var data = {'ac':ac, 'id':k};
            var html = Mustache.to_html(template, data);
            ac_el.prepend(html);
        }
    }

    function setup_banks() {
       var sortlist = [];
        for(var k in pd.banks) {
            sortlist.push([k, pd.banks[k].cost]);
        }
        var sorted = sortlist.sort(function(x,y) { return x[1] - y[1] });
        var bn_el = $('#banks');
        bn_el.html('');

        for(var i in sorted) {
            var k = sorted[i][0];
            var bn = pd.banks[k];
            var template = $('#tpl_bank').html();
            var data = {'bn':bn, 'id':k};
            var html = Mustache.to_html(template, data);
            bn_el.prepend(html);
        }
    }

    function setup_clickers() {
        var sortlist = [];
        for(var k in pd.clickers) {
            sortlist.push([k, pd.clickers[k].base_cost]);
        }
        var sorted = sortlist.sort(function(x,y) { return x[1] - y[1] });

        var cs_el = $('#clickers');
        cs_el.html('');

        for(var i in sorted) {
            var k = sorted[i][0];
            var cl = pd.clickers[k];
            var template = $('#tpl_clicker').html();
            var data = {'cl':cl, 'id':k};
            var html = Mustache.to_html(template, data);
            cs_el.prepend(html);
        }
    }

    function setup_sellers() {
        var sortlist = [];
        for(var k in pd.sellers) {
            sortlist.push([k, pd.sellers[k].base_cost]);
        }
        var sorted = sortlist.sort(function(x,y) { return x[1] - y[1] });

        var sl_el = $('#sellers');
        sl_el.html('');

        for(var i in sorted) {
            var k = sorted[i][0];
            var sl = pd.sellers[k];
            var template = $('#tpl_seller').html();
            var data = {'sl':sl, 'id':k};
            var html = Mustache.to_html(template, data);
            sl_el.prepend(html);
        }
    }

    function setup_upgrades() {
        var sortlist = [];
        for(var k in pd.upgrades) {
            sortlist.push([k, pd.upgrades[k].cost]);
        }
        var sorted = sortlist.sort(function(x,y) { return x[1] - y[1] });
        var upgs_el = $('#upgrades');
        upgs_el.html('');

        for(var i in sorted) {
            var k = sorted[i][0];
            var upg = pd.upgrades[k];
            var template = $('#tpl_upgrade').html();
            var data = {'upg':upg, 'id':k};
            var html = Mustache.to_html(template, data);
            upgs_el.prepend(html);
        }
    }



    function check_achievements() {
        for(var k in pd.achievements) {
            var a = pd.achievements[k];
            if(a.unlocked) {
                continue;
            }
            var pps = a.property.split('.');
            var val = pd;
            for(var i = 0; i<pps.length; i++) {
                val = val[pps[i]];
            }
            if((val === true)&&(val === a.required)) {
                unlock_achievement(k);
            }
            else if((val)&&((a.required >= 0 && val >= a.required)||(a.required < 0 && val <= a.required))) {
                unlock_achievement(k);
            }
        }
    }



    this.check_events = function() {
        for(var k in pd.events) {
            var rnd = Math.random();
            if(pd.events[k].chance > rnd) {
                run_event(k);
            }
        }
    }

    function run_event(evk) {
        if(pd.events[evk]) {
            eval(pd.events[evk].action);
        }
    }

    function event_irs_audit(n) {
        var rsk = get_risk2();
        if(rsk < Math.random()) {
            good_message('You were able to avoid an IRS audit');
            return;
        }
        var amt = pd.cash.amount * n;
        amt -= get_safe_cash();
        if(amt < 1) {
            good_message('The IRS was unable to find any unsecured cash to seize');
            return;
        }
        pd.cash.amount -= amt;
        bad_message('The IRS has confiscated $'+pretty_bigint(amt)+' of your funds');
    }

    function event_found_meth(r) {
        var amt = pd.stats.clicker_rps * r;
        if(amt < 100) { amt = 100; }
        pd.widgets.amount += amt;
        good_message('You found an old hard drive, with '
            +pretty_bigint(amt)+' bitcoin within its wallet.dat!');
    }

    function event_found_cash(r) {
        var amt = (pd.stats.seller_rps * pd.widget_roi) * r;
        if(amt < 100) { amt = 100; }
        earn_cash(amt);
        if(amt > 10000000000) {
            good_message('A mystery benefactor has contributed $'
                +pretty_bigint(amt)+' to your cause');
            return;
        }
        if(amt > 10000000) {
            good_message('You found a truck load of cash, containing $'
                +pretty_bigint(amt)+' inside!');
            return;
        }
        if(amt > 100000) {
            good_message('You found a briefcase with $'+pretty_int(amt)+' inside!');
            return;
        }
        good_message('You found some extra cash hidden in a shoe box, worth $'
            +pretty_int(amt)+'!');
    }

    function event_lose_meth(r) {
        var amt = (pd.stats.clicker_rps * r);
        if(amt < 1) {
            return false;
        }
        if(amt > pd.widgets.amount) {
            amt = pd.widgets.amount;
        }
        pd.widgets.amount -= amt;
        bad_message('About '+pretty_bigint(amt)+' bitcoins have gone missing...');
        return true;
    }

    function event_lose_cash(r) {
        var amt = (pd.stats.seller_rps * pd.widget_roi) * r;
        amt -= get_safe_cash();
        if(amt < 1) {
            return false;
        }
        if(amt > pd.cash.amount) {
            amt = pd.cash.amount;
        }
        pd.cash.amount -= amt;
        bad_message('According to accounting, $'+pretty_bigint(amt)+' has been "lost"');
        return true;
    }

    function event_rival_lose_cash(r) {
        var amt = (pd.stats.seller_rps * pd.widget_roi) * r;
        amt -= get_safe_cash();
        if(amt < 1) {
            return false;
        }
        if(amt > pd.cash.amount) {
            amt = pd.cash.amount;
        }
        pd.cash.amount -= amt;
        bad_message('$'+pretty_bigint(amt)+'was accidentally lost!');
        return true;
    }

    function event_pay_bribe(r) {
        var amt = (pd.stats.seller_rps * pd.widget_roi) * r;
        amt -= get_safe_cash();
        if(amt < 1) {
            return false;
        }
        if(amt > pd.cash.amount) {
            amt = pd.cash.amount;
        }
        pd.cash.amount -= amt;
        bad_message('You had to give your mom a birthday present worth $'+pretty_bigint(amt));
        return true;
    }

    function event_dea_seize_cash(n) {
        var amt = (pd.cash.amount * n);
        amt -= get_safe_cash();
        if(amt < 1) {
            good_message('Whoa, your equipment almost overheated!');
            return false;
        }
        pd.cash.amount -= amt;
        bad_message('Due to a hardware failure, you have lost $'+pretty_bigint(amt)+'!');
        return true;
    }

    function event_dea_seize_building() {
        var nw = (new Date).getTime();

        if(pd.risk_amount > Math.random()) {
            if((nw - last_bust) < 240000) {
                good_message('You narrowly avoided a major hardware failure.');
                return false;
            }
            var picks = [];
            for(var k in pd.clickers) {
                var cl = pd.clickers[k];
                if((cl.amount > 0) && (cl.risk > 0.001)) {
                    picks.push(k);
                }
            }
            if(picks.length < 1) {
                good_message('You dropped a hard drive with a valuable wallet.dat, but luckily a kind pedestrian returned it to you!');
                return false;
            }
            var pick = picks[Math.floor(Math.random()*picks.length)];
            pd.clickers[pick].amount -= 1;
            bad_message('Due to a hardware failure, you had to give up a '+pd.clickers[pick].label+'!');
            event_dea_seize_cash(0.1);
            last_bust = nw;
            return true;
        }
        good_message('Watch out, you almost lost your wallet.dat!');
        return false;
    }
} // END - Game()



function add_message(msg, _type) {
    var el = $("<div></div>");
    el.html(msg);
    el.addClass(_type);
    $('#last_message').html($(el).clone().wrap('<p>').parent().html());
    $('#messages').prepend(el);

    if($('#messages div').length > 45) {
        $('#messages div:last').remove();
    }
}
function error(msg) {
    add_message('&#10007; '+msg, 'text-warning');
}
function message(msg) {
    add_message('&#9993; '+msg, 'message');
}
function good_message(msg) {
    add_message('&#9733; '+msg, 'text-success');
}
function bad_message(msg) {
    add_message('&#10007; '+msg, 'text-danger');
}

function switch_tab(tbid) {
    var tb_el = $('#'+tbid+'_div');
    $('.tab_div').hide();
    $('.tab').removeClass('active');
    $('#'+tbid+'_tab').addClass('active');
    tb_el.show();
    active_tab = tbid;
    return false;
}

function toggle_tab(tbid) {
    $('#'+tbid+'_div').toggle(200);
    return false;
}

function pretty_bigint_full(num) {
    var sn = '';
    if(num >= 1e66) {
        return pretty_int(num)
    }
	  if(num < 1) {
      sn = Math.round(num * 1000) / 1000;
		  return sn;
		}
    if(num >= 1e63) {
        sn = Math.round((num / 1e63) * 100) / 100;
        return sn + ' vigintillion';
    }
    if(num >= 1e60) {
        sn = Math.round((num / 1e60) * 100) / 100;
        return sn + ' novemdecillion';
    }
    if(num >= 1e57) {
        sn = Math.round((num / 1e57) * 100) / 100;
        return sn + ' octodecillion';
    }
    if(num >= 1e54) {
        sn = Math.round((num / 1e54) * 100) / 100;
        return sn + ' septendecillion';
    }
    if(num >= 1e51) {
        sn = Math.round((num / 1e51) * 100) / 100;
        return sn + ' sexdecillion';
    }
    if(num >= 1e48) {
        sn = Math.round((num / 1e48) * 100) / 100;
        return sn + ' quindecillion';
    }
    if(num >= 1e45) {
        sn = Math.round((num / 1e45) * 100) / 100;
        return sn + ' quattourdecillion';
    }
    if(num >= 1e42) {
        sn = Math.round((num / 1e42) * 100) / 100;
        return sn + ' tredecillion';
    }
    if(num >= 1e39) {
        sn = Math.round((num / 1e39) * 100) / 100;
        return sn + ' duodecillion';
    }
    if(num >= 1e36) {
        sn = Math.round((num / 1e36) * 100) / 100;
        return sn + ' undecillion';
    }
    if(num >= 1e33) {
        sn = Math.round((num / 1e33) * 100) / 100;
        return sn + ' decillion';
    }
    if(num >= 1e30) {
        sn = Math.round((num / 1e30) * 100) / 100;
        return sn + ' nonillion';
    }
    if(num >= 1e27) {
        sn = Math.round((num / 1e27) * 100) / 100;
        return sn + ' octillion';
    }
    if(num >= 1e24) {
        sn = Math.round((num / 1e24) * 100) / 100;
        return sn + ' septillion';
    }
    if(num >= 1e21) {
        sn = Math.round((num / 1e21) * 100) / 100;
        return sn + ' sextillion';
    }
    if(num >= 1e18) {
        sn = Math.round((num / 1e18) * 100) / 100;
        return sn + ' quintillion';
    }
    if(num >= 1e15) {
        sn = Math.round((num / 1e15)*100) / 100;
        return sn + ' quadrillion';
    }
    if(num >= 1e12) {
        sn = Math.round((num / 1e12) * 100) / 100;
        return sn + ' trillion';
    }
    if(num >= 1e9) {
        sn = Math.round((num / 1e9) * 100) / 100;
        return sn + ' billion';
    }
    if(num >= 1e6) {
        sn = Math.round((num / 1e6) * 100) / 100;
        return sn + ' million';
    }
    return pretty_int(num);
}

function pretty_bigint(num) {
    if ($('#bigint_full').is(':checked')) {
        return pretty_bigint_full(num);
    }
    var sn = '';
    if(num >= 1e24) {
      return pretty_int(num)
    }
	  if(num < 1) {
      sn = Math.round(num * 1000) / 1000;
		  return sn;
		}
    if(num >= 1e21) {
        sn = Math.round((num / 1e21) * 100) / 100;
        return sn + 'S';
    }
    if(num >= 1e18) {
        sn = Math.round((num / 1e18) * 100) / 100;
        return sn + 'Qt';
    }
    if(num >= 1e15) {
        sn = Math.round((num / 1e15)*100) / 100;
        return sn + 'Q';
    }
    if(num >= 1e12) {
        sn = Math.round((num / 1e12) * 100) / 100;
        return sn + 'T';
    }
    if(num >= 1e9) {
        sn = Math.round((num / 1e9) * 100) / 100;
        return sn + 'B';
    }
    if(num >= 1e6) {
        sn = Math.round((num / 1e6) * 100) / 100;
        return sn + 'M';
    }
    return pretty_int(num);
}

function pretty_int(num) {
	if(num < 1000) {
        num = Math.round(num * 100) / 100;
		}
    else {
        num = Math.round(num);
    }
    var num_str = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_str;
}

function track_page_view(pg) {
    if(has_gaq) {
        _gaq.push(['_trackPageview',pg]);
        return true;
    }
    return false;
}

function track_event(category, action, message) {
    return false;
    if(has_gaq) {
        _gaq.push(['_trackEvent', category, action, message]);
        return true;
    }
    return false;
}

function log(type, msg, data) {
    var obj = null;
    if(data) { obj = data; }
    remote_log({
        'type':type,
        'text':msg,
        'version':'0.8.3',
        'user_agent':navigator.userAgent,
        'extra':Base64.encode(JSON.stringify(obj)),
    });
    console.log(type.toUpperCase()+': '+msg);
}

function warning_log(msg, data) {
    log('warning',msg,data);
}

function debug_log(msg, data) {
    log('debug',msg,data);
}

function error_log(msg, data) {
    log('error',msg,data);
}

function remote_log(data) {
    if(has_loggly) {
        _LTracker.push(data);
        return true;
    }
    return false;
}

var gm = new Game();
$(document).ready(function() {
    gm.setup_display();
    tmr = setInterval("gm.tick()", tick_ms);
    sec_tmr = setInterval("gm.sec_tick()", 1000);
    save_tmr = setInterval("gm.do_save()", 30000);
    event_tmr = setInterval("gm.check_events()", 120000);
    ver_tmr = setInterval("gm.check_version()", 620000);
    gm.do_load();
    message('Welcome to '+gm.get_title()+'!');

    var bind_type = 'click';
    if ('ontouchstart' in window) {
        bind_type = 'touchstart click';
    } else if(window.navigator.msPointerEnabled) {
        bind_type = 'touchstart click';
    }

    $('#make_btn').bind(bind_type, function(e) {
        gm.do_make_click();

        var elc = $('.make_up:first').clone()
        elc.html('+'+pretty_bigint(gm.get_click_make_amount()));
        if (!$('#no_show_num_onClick').is(':checked')) {
          $('#make_div').append(elc);
        }
        elc.show();
        elc.offset({left:e.pageX-30, top:e.pageY-50});
        var end_y = e.clientY-150;
        elc.css('opacity',100);
        if(last_float == 1) {
            var this_float = e.pageX;
            last_float = 0;
        } else {
            var this_float = e.pageX - 60;
            last_float = 1;
        }
        elc.animate({'top':end_y.toString()+'px', 'opacity':0, 'left':this_float.toString()+'px'}, 750, function() {
            $(this).remove();
        });

    });

    $('#sell_btn').bind(bind_type, function(e) {
        var sale = gm.do_sell_click();
        if(sale == 0) {
            return;
        }

        var elc = $('.sell_up:first').clone()
        elc.html('$'+pretty_bigint(sale*gm.get_widget_roi()));
        if (!$('#no_show_num_onClick').is(':checked')) {
          $('#sell_div').append(elc);
        }
        elc.show();
        elc.offset({left:e.pageX-30, top:e.pageY-50});
        var end_y = e.clientY-150;
        elc.css('opacity',100);
        if(last_float == 1) {
            var this_float = e.pageX;
            last_float = 0;
        } else {
            var this_float = e.pageX - 60;
            last_float = 1;
        }
        elc.animate({'top':end_y.toString()+'px', 'opacity':0, 'left':this_float.toString()+'px'}, 750, function() {
            $(this).remove();
        });

    });

    switch_tab('clickers');
    $('button').attr('disabled', false);
});
