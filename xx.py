import os
import json
import requests
import execjs
# os.environ["EXECJS_RUNTIME"] = "Node"
print(execjs.get().name)
import threading
# os.environ["EXECJS_RUNTIME"] = 'Phantomjs'
# a=[
#     '$','&','*','#'
# ]
#
# b=[
#     '2','3','4','5','6','7','8','9','10','J','Q','K','A'
# ]
# dic={}
# for i in a:
#     for j in b:
#         dic[i+j]=(a.index(i)*13+b.index(j))
#         dic[(a.index(i) * 13 + b.index(j))] = i+j
#         print(a.index(i) * 13 + b.index(j))
#     print('---')
#
# print(json.dumps(dic,ensure_ascii=False))

Pokedic = {"$2": 0, "0": "$2", "$3": 1, "1": "$3", "$4": 2, "2": "$4", "$5": 3, "3": "$5", "$6": 4, "4": "$6", "$7": 5,
       "5": "$7", "$8": 6, "6": "$8", "$9": 7, "7": "$9", "$10": 8, "8": "$10", "$J": 9, "9": "$J", "$Q": 10,
       "10": "$Q", "$K": 11, "11": "$K", "$A": 12, "12": "$A", "&2": 13, "13": "&2", "&3": 14, "14": "&3", "&4": 15,
       "15": "&4", "&5": 16, "16": "&5", "&6": 17, "17": "&6", "&7": 18, "18": "&7", "&8": 19, "19": "&8", "&9": 20,
       "20": "&9", "&10": 21, "21": "&10", "&J": 22, "22": "&J", "&Q": 23, "23": "&Q", "&K": 24, "24": "&K", "&A": 25,
       "25": "&A", "*2": 26, "26": "*2", "*3": 27, "27": "*3", "*4": 28, "28": "*4", "*5": 29, "29": "*5", "*6": 30,
       "30": "*6", "*7": 31, "31": "*7", "*8": 32, "32": "*8", "*9": 33, "33": "*9", "*10": 34, "34": "*10", "*J": 35,
       "35": "*J", "*Q": 36, "36": "*Q", "*K": 37, "37": "*K", "*A": 38, "38": "*A", "#2": 39, "39": "#2", "#3": 40,
       "40": "#3", "#4": 41, "41": "#4", "#5": 42, "42": "#5", "#6": 43, "43": "#6", "#7": 44, "44": "#7", "#8": 45,
       "45": "#8", "#9": 46, "46": "#9", "#10": 47, "47": "#10", "#J": 48, "48": "#J", "#Q": 49, "49": "#Q", "#K": 50,
       "50": "#K", "#A": 51, "51": "#A"}
def get_js():
    f = open("./main.js", 'r', encoding='utf-8') # 打开JS文件
    x=f.readlines()
    f.close()
    htmlstr = ''
    for i in x:
        htmlstr+=i
    # while line:
    #     # print(line)
    #     htmlstr = htmlstr+line
    #     line = f.readline()
    return htmlstr

def get_des_psswd(hand):
    # js_obj=js2py.EvalJs()
    jsstr = get_js()
    # js_obj.execute(jsstr)
    ct = execjs.compile(jsstr)
    result=ct.call("optimize_hand",hand)
    return result

def run():
    try:
        account = {}
        account["username"] = 'dst'
        account["password"] = 'dxdst'
        re = requests.post('https://api.shisanshui.rtxux.xyz/auth/login', data=json.dumps(account),
                           headers={"Content-Type": 'application/json'})
        # print(re.text)
        token = json.loads(re.text)["data"]["token"]
        user_id = json.loads(re.text)["data"]["user_id"]
        #开启一个战局
        re=requests.post('https://api.shisanshui.rtxux.xyz/game/open',headers={"X-Auth-Token":token,})
        game_id,card=json.loads(re.text)["data"]["id"],json.loads(re.text)["data"]["card"]
        hand=[]
        card=card.split(' ')
        for i in card:
            hand.append(Pokedic[i])
        card=get_des_psswd(hand)
        submit=[]
        for i in card:
            new=[]
            for j in i:
                new.append(Pokedic[str(j)])
            submit.append(" ".join(new))

        sun={}
        sun["id"]=game_id
        sun["card"]=submit
        try:
            re=requests.post('https://api.shisanshui.rtxux.xyz/game/submit',data=json.dumps(sun),headers={"X-Auth-Token":token,"Content-Type":'application/json'})
            try:

                print(game_id,json.loads(re.text)["data"]["msg"])
            except Exception as e:
                with open("./error.txt", 'a', encoding='gbk') as f:
                    f.write("获得的牌: "+str(hand)+'\n'+"提交的牌: "+str(card)+"\n")
                print("\n获得的牌: " + str(hand) + '\n' + "提交的牌: " + str(card) + "\n")
                print(game_id,"fail")
        except Exception as e:
            pass
            # with open("./error.txt",'a',encoding='gbk') as f:
            #     f.write("获得的牌: "+str(hand)+'\n'+"提交的牌: "+str(card)+"\n")

    except Exception as e:
        print("fail",e)

def show():
    account={}
    account["username"]='dst'
    account["password"]='dxdst'
    re=requests.post('https://api.shisanshui.rtxux.xyz/auth/login',data=json.dumps(account),headers={"Content-Type":'application/json'})
    print(re.text)
    token=json.loads(re.text)["data"]["token"]
    user_id=json.loads(re.text)["data"]["user_id"]
    i=1
    all=[]
    while(1):
        data={
            'player_id':9,
            'limit':5,
            'page':i,
        }
        re = requests.get('https://api.shisanshui.rtxux.xyz/history', params=data,headers={"X-Auth-Token":token,})
        dic=json.loads(re.text)
        if dic["data"]==[]:
            break
        # print(dic["data"])
        all.extend(dic["data"])
        i+=1
    for i in all:
        # print(i)
        re=requests.get('https://api.shisanshui.rtxux.xyz/history/'+str(i["id"]),headers={"X-Auth-Token":token,})
        if not('"status":3001' in re.text ):
            text=json.loads(re.text)
            print(text["data"]["id"])
if __name__=="__main__":

    i=0
    while True:
        i+=1
        pool = []
        for j in range(0, 4):
            t = threading.Thread(target=run)
            pool.append(t)
        print("第{0}次游戏".format(i))
        for t in pool:
            t.start()
        for t in pool:
            t.join()
    # show()
    # account={}
    # account["username"]='SheepHuan'
    # account["password"]='GoodJob'
    # re=requests.post('https://api.shisanshui.rtxux.xyz/auth/login',data=json.dumps(account),headers={"Content-Type":'application/json'})
    # print(re.text)
    # token=json.loads(re.text)["data"]["token"]
    # user_id=json.loads(re.text)["data"]["user_id"]
    # i=1
    # all=[]
    # while(1):
    #     data={
    #         'player_id':9,
    #         'limit':5,
    #         'page':i,
    #     }
    #     re = requests.get('https://api.shisanshui.rtxux.xyz/history', params=data,headers={"X-Auth-Token":token,})
    #     dic=json.loads(re.text)
    #     if dic["data"]==[]:
    #         break
    #     # print(dic["data"])
    #     all.extend(dic["data"])
    #     i+=1
    # for i in all:
    #     print(i)
    #     # run(i["id"])
