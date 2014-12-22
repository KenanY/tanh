var tanh = require('../');
var test = require('tape');
var defined = require('defined');

function tolerance(precision) {
  precision = defined(precision, 7);
  return 0.5 * Math.pow(10, -precision);
}

function almostEqual(a, b, precision){
  return Math.abs(a - b) < tolerance(precision);
}

var sloppyTolerance = 4;

test('sloppy algebraic expression', function(t) {
  t.plan(40);
  for (var i = -20; i < 20; i++) {
    t.ok(almostEqual(tanh(i),
      (Math.exp(i) - Math.exp(-i)) / (Math.exp(i) + Math.exp(-i)),
      sloppyTolerance));
  }
});

test('sloppy approximations', function(t) {
  var FIXTURES = [
    [-0.9999983310699463, -6.998237084679027],
    [-0.9999978542327881, -6.87257975132917],
    [-0.999992847442627, -6.2705920974657525],
    [-0.9999861717224121, -5.940967614084813],
    [-0.9999828338623047, -5.832855225378502],
    [-0.9999399185180664, -5.20646301208756],
    [-0.9998834133148193, -4.8749821841810785],
    [-0.9998509883880615, -4.752279497280338],
    [-0.9996016025543213, -4.260504202858904],
    [-0.9993612766265869, -4.0244334353203115],
    [-0.9989283084869385, -3.7655641082999236],
    [-0.9969782829284668, -3.246782610980921],
    [-0.9950058460235596, -2.9950671179940938],
    [-0.9942638874053955, -2.9256242749609536],
    [-0.990715742111206, -2.6839646283308363],
    [-0.9903340339660645, -2.663723350226518],
    [-0.9760982990264893, -2.207464998348322],
    [-0.975830078125, -2.201817459680556],
    [-0.9728245735168457, -2.1424542308291437],
    [-0.9643559455871582, -2.0046686756020917],
    [-0.9377224445343018, -1.7188337346177065],
    [-0.9362406730651855, -1.7066940482565154],
    [-0.9310147762298584, -1.6659543005533146],
    [-0.9284839630126953, -1.6472838718760747],
    [-0.9270248413085938, -1.6368067340881562],
    [-0.9075665473937988, -1.5135473477311114],
    [-0.897477388381958, -1.4590986086331497],
    [-0.8920106887817383, -1.431681573516303],
    [-0.8776559829711914, -1.365471286049011],
    [-0.864722728729248, -1.3117705583444539],
    [-0.8482067584991455, -1.249725893334944],
    [-0.8056559562683105, -1.1145246028592257],
    [-0.8048388957977295, -1.112200609756455],
    [-0.7801985740661621, -1.0458778330822556],
    [-0.7749934196472168, -1.032711173436253],
    [-0.7619285583496094, -1.0007967281362184],
    [-0.7504425048828125, -0.9739672824457072],
    [-0.7495596408843994, -0.9719492983286864],
    [-0.7481319904327393, -0.968698942014487],
    [-0.7459518909454346, -0.9637657636705832],
    [-0.7401137351989746, -0.9507308314464193],
    [-0.7289731502532959, -0.9265325319867653],
    [-0.7226788997650146, -0.9132299082876396],
    [-0.7161557674407959, -0.8997082193533088],
    [-0.7017018795013428, -0.8706453720344796],
    [-0.7013418674468994, -0.86993650130945],
    [-0.691054105758667, -0.8499705913361888],
    [-0.6847054958343506, -0.837919455842005],
    [-0.6838164329528809, -0.8362476144993315],
    [-0.6747090816497803, -0.8193374156276964],
    [-0.6575610637664795, -0.7885046044142132],
    [-0.6522045135498047, -0.7791255597799839],
    [-0.6261923313140869, -0.7351275788820003],
    [-0.623173713684082, -0.7301771459970386],
    [-0.6067488193511963, -0.7037597526130627],
    [-0.5838055610656738, -0.6682166303197608],
    [-0.579524040222168, -0.6617457665293066],
    [-0.5760939121246338, -0.656596458857398],
    [-0.5654678344726562, -0.6408350116350283],
    [-0.5578761100769043, -0.6297442839791668],
    [-0.5523209571838379, -0.6217149641475687],
    [-0.5396339893341064, -0.6036390747171698],
    [-0.5128989219665527, -0.5666556256064771],
    [-0.5087778568267822, -0.5610793900942042],
    [-0.4977825880050659, -0.546353950571504],
    [-0.4913865327835083, -0.5378865967606703],
    [-0.48976075649261475, -0.5357455496477738],
    [-0.48493504524230957, -0.5294166456244711],
    [-0.4479050636291504, -0.4820764946679979],
    [-0.4461095333099365, -0.4798325976916711],
    [-0.4429593086242676, -0.47590653371561276],
    [-0.42827916145324707, -0.45778739362936793],
    [-0.40590059757232666, -0.4306933608076879],
    [-0.40029656887054443, -0.4240020382545707],
    [-0.3961341381072998, -0.4190551379319939],
    [-0.3836275339126587, -0.40430627175908734],
    [-0.36686253547668457, -0.3847928551425507],
    [-0.3657644987106323, -0.38352464227459343],
    [-0.33507001399993896, -0.3485286317501442],
    [-0.32572221755981445, -0.3380352468276522],
    [-0.3191967010498047, -0.3307524237890151],
    [-0.3000025749206543, -0.3095224337886503],
    [-0.29665136337280273, -0.3058438250228025],
    [-0.2944457530975342, -0.3034271164344305],
    [-0.2872810363769531, -0.29560018347246825],
    [-0.27738428115844727, -0.28484608203169437],
    [-0.2390844225883484, -0.2438028008332661],
    [-0.23685944080352783, -0.24144425169391517],
    [-0.2253856658935547, -0.2293228153248168],
    [-0.22283810377120972, -0.22664053064745143],
    [-0.21552443504333496, -0.21895773601143995],
    [-0.2153375744819641, -0.21876178107952995],
    [-0.21016258001327515, -0.21334143320771737],
    [-0.20250272750854492, -0.2053409277979887],
    [-0.19156384468078613, -0.19396008474133075],
    [-0.18251943588256836, -0.18458771439322938],
    [-0.17464947700500488, -0.17645844608618066],
    [-0.15646183490753174, -0.15775766677189154],
    [-0.15580910444259644, -0.15708862621964176],
    [-0.15365445613861084, -0.15488112515549593],
    [-0.122499018907547, -0.12311733609904851],
    [-0.1088167130947113, -0.10924929296737837],
    [-0.08792558312416077, -0.08815322150790302],
    [-0.08401328325271606, -0.08421178632314608],
    [-0.06121261417865753, -0.06128924075509796],
    [-0.05341699719429016, -0.05346789060550386],
    [-0.05047759413719177, -0.05052053189238029],
    [-0.02924579381942749, -0.029254136237332657],
    [-0.02485968917608261, -0.02486481220617492],
    [-0.020469173789024353, -0.02047203328100153],
    [-0.01882001757621765, -0.018822240021756347],
    [-0.016152501106262207, -0.016153906073109205],
    [-0.0032715508714318275, -0.003271562543358962],
    [1.6504814008555524e-12, 1.6504814008555524e-12],
    [2.0654207510961697e-12, 2.0654207510961697e-12],
    [6.933230031758164e-12, 6.933230031758164e-12],
    [1.3351444949627478e-11, 1.3351444949627478e-11],
    [1.6399812063916386e-11, 1.6399812063916386e-11],
    [5.730159402528301e-11, 5.730159402528301e-11],
    [1.113731329382972e-10, 1.113731329382972e-10],
    [1.4214707189097453e-10, 1.4214707189097453e-10],
    [3.8006320313144215e-10, 3.8006320313144215e-10],
    [6.09162720266454e-10, 6.09162720266454e-10],
    [1.0221641311147778e-9, 1.0221641311147778e-9],
    [2.8819222563924995e-9, 2.8819222563924995e-9],
    [4.7627768395841485e-9, 4.7627768395841485e-9],
    [8.854133426439148e-9, 8.854133426439148e-9],
    [2.3050326092288742e-8, 2.3050326092288745e-8],
    [5.9392490925347374e-8, 5.939249092534745e-8],
    [1.166764889148908e-7, 1.1667648891489133e-7],
    [2.3799674409019644e-7, 2.3799674409020094e-7],
    [4.684659415943315e-7, 4.684659415943658e-7],
    [9.382699772686465e-7, 9.382699772689218e-7],
    [0.00000110398559627356, 0.0000011039855962740086],
    [0.0000032917760108830407, 0.0000032917760108949305],
    [0.00000751721381675452, 0.000007517213816896115],
    [0.000015114666894078255, 0.000015114666895229252],
    [0.00002986399340443313, 0.00002986399341331128],
    [0.00003387028118595481, 0.000033870281198906756],
    [0.00009066011989489198, 0.00009066012014327826],
    [0.00021949532674625516, 0.0002194953302712184],
    [0.00043952150736004114, 0.0004395215356621756],
    [0.0006333151832222939, 0.0006333152678940465],
    [0.001115123275667429, 0.0011151237378863419],
    [0.001962467096745968, 0.001962469616086656],
    [0.005553754046559334, 0.005553811147953338],
    [0.007324676960706711, 0.0073248079567425],
    [0.008691128343343735, 0.008691347183450786],
    [0.011912941932678223, 0.011913505535037906],
    [0.02993336319923401, 0.029942308168570204],
    [0.05124260485172272, 0.05128752666822782],
    [0.05473744869232178, 0.05479221508125444],
    [0.06158891320228577, 0.061666963819518306],
    [0.09375360608100891, 0.09402975380882211],
    [0.09442159533500671, 0.09470370926367391],
    [0.09443172812461853, 0.09471393321406026],
    [0.09943729639053345, 0.09976699249016487],
    [0.11201295256614685, 0.11248498303558895],
    [0.12310260534286499, 0.12373016402339168],
    [0.13562965393066406, 0.13647060950861248],
    [0.13763350248336792, 0.13851257866094746],
    [0.14749455451965332, 0.14857829980464834],
    [0.1618971824645996, 0.16333433166790448],
    [0.17051106691360474, 0.17219298693637355],
    [0.17051833868026733, 0.17220047646299907],
    [0.18562912940979004, 0.18780647318150087],
    [0.18898820877075195, 0.1912876932893582],
    [0.23206615447998047, 0.23637212433914523],
    [0.23480379581451416, 0.2392675448267427],
    [0.2646920680999756, 0.27114729033023005],
    [0.2794986963272095, 0.2871382059344433],
    [0.28789305686950684, 0.2962673858386819],
    [0.292596697807312, 0.30140373665239234],
    [0.3101649284362793, 0.320727882769785],
    [0.3109246492385864, 0.3215686893944558],
    [0.31145012378692627, 0.3221505056451929],
    [0.3271782398223877, 0.3396649461699478],
    [0.3574345111846924, 0.37394153436545424],
    [0.3593693971633911, 0.37616159223090223],
    [0.35960352420806885, 0.37643046596933716],
    [0.3626827001571655, 0.3799714809649667],
    [0.38961827754974365, 0.4113499159905353],
    [0.3904266357421875, 0.41230330080214],
    [0.3981136083602905, 0.4214052375603139],
    [0.411507248878479, 0.43742438709579096],
    [0.4120509624481201, 0.43807911823743495],
    [0.41868770122528076, 0.4460997186945703],
    [0.42136549949645996, 0.4493511447897729],
    [0.4516327381134033, 0.48674948990473677],
    [0.4538639783859253, 0.4895560176112375],
    [0.4655507802963257, 0.5043748446613433],
    [0.48124635219573975, 0.5246050193978663],
    [0.48621630668640137, 0.5310932154891663],
    [0.4898730516433716, 0.5358932909903701],
    [0.5024838447570801, 0.5526234425942533],
    [0.5074074268341064, 0.5592320547729962],
    [0.5093221664428711, 0.5618140818296767],
    [0.5143489837646484, 0.5686253097655146],
    [0.5154285430908203, 0.5700943191671631],
    [0.5234100818634033, 0.5810250825991418],
    [0.5274472236633301, 0.5866018515043636],
    [0.5309803485870361, 0.5915094458340507],
    [0.5477793216705322, 0.6152030999229688],
    [0.5577394962310791, 0.6295459624918965],
    [0.5582785606384277, 0.6303287742357745],
    [0.5843560695648193, 0.6690521906099505],
    [0.5871362686157227, 0.6732844960442398],
    [0.5878911018371582, 0.6744372167164567],
    [0.5903406143188477, 0.6781887236623534],
    [0.5945003032684326, 0.684597775489552],
    [0.5957975387573242, 0.6866065102131665],
    [0.5961520671844482, 0.6871563252400655],
    [0.6005008220672607, 0.6939300827887145],
    [0.6150004863739014, 0.7169242329194352],
    [0.6162893772125244, 0.7189998055497108],
    [0.6194069385528564, 0.7240422748778544],
    [0.6285066604614258, 0.7389438896054792],
    [0.6293842792510986, 0.7403958734869583],
    [0.6416172981262207, 0.7609178886018204],
    [0.6424276828765869, 0.7622965466812235],
    [0.6437420845031738, 0.7645378650643101],
    [0.6468508243560791, 0.769864795178161],
    [0.6615910530090332, 0.7956379107512945],
    [0.669950008392334, 0.8106524185805045],
    [0.6813662052154541, 0.8316597473423232],
    [0.6968657970428467, 0.8611812790659296],
    [0.6981887817382812, 0.8637579113749143],
    [0.7447831630706787, 0.9611360201710216],
    [0.7518312931060791, 0.9771540941752986],
    [0.7534394264221191, 0.9808634133542229],
    [0.7567856311798096, 0.9886489208209699],
    [0.7817282676696777, 1.0497991719828956],
    [0.8115026950836182, 1.1314141444187586],
    [0.814647912979126, 1.1406947755584418],
    [0.8266689777374268, 1.1775230833699681],
    [0.8313877582550049, 1.1926138225701433],
    [0.8343038558959961, 1.2021323323039612],
    [0.8416652679443359, 1.2268570644335162],
    [0.8584413528442383, 1.2873896671573652],
    [0.8678996562957764, 1.3245040433929398],
    [0.8679344654083252, 1.3246451309261607],
    [0.8800599575042725, 1.3760334877782177],
    [0.9003539085388184, 1.4740852961194106],
    [0.9099440574645996, 1.5271990851861994],
    [0.9142425060272217, 1.5527768948273004],
    [0.9149219989776611, 1.556931837197936],
    [0.9184908866882324, 1.5792896628381612],
    [0.9188928604125977, 1.5818663359427627],
    [0.919395923614502, 1.5851082843320008],
    [0.9296839237213135, 1.6560555223295368],
    [0.9298396110534668, 1.6572041418041492],
    [0.9352962970733643, 1.6990986433619266],
    [0.9376416206359863, 1.718164398807965],
    [0.9410912990570068, 1.7475084077246632],
    [0.962122917175293, 1.9737180163455101],
    [0.9748215675354004, 2.1811227771083783],
    [0.9769454002380371, 2.2257214499698255],
    [0.985663890838623, 2.4654635601650536],
    [0.9880380630493164, 2.5565869228142004],
    [0.9928233623504639, 2.8132383539094192],
    [1e-300, 1e-300],
    [0.00001, 0.000010000000000333334],
    [0.3, 0.3095196042031117],
    [1e-30, 1e-30],
    [1e-10, 1e-10],
  ];

  t.plan(FIXTURES.length);

  FIXTURES.forEach(function(fixture) {
    t.ok(almostEqual(tanh(fixture[1]), fixture[0], sloppyTolerance));
  });
});