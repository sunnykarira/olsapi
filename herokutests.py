import requests
import json
import time

print('---------------------------------HOMEPAGE------------------------')
#------------------------------------------------------------------
count = 1
print('Executing Step ' + str(count))
time.sleep(2)
print('URL --- GET /')
url = 'https://ols80.herokuapp.com/'
r = requests.get(url)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print

print('---------------------------------SIGNUP------------------------')

#---------------------------------------------------------------------------
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- POST /api/signup')
url = 'https://ols80.herokuapp.com/api/signup'
print('DATA --- password: Abcdefg@12, confirmpassword: Abcdefg@12')
payload = json.dumps({'password': 'Abcdefg@12', 'confirmpassword': 'Abcdefg@12'})
headers = {"content-type": "application/json"}
r = requests.post(url, data=payload, headers=headers)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print

#--------------------------------------------------------------------------
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- POST /api/signup')
url = 'https://ols80.herokuapp.com/api/signup'
print('DATA --- username: user1234, password: Abcdefg@12')
payload = json.dumps({'username': 'user1234', 'password': 'Abcdefg@12'})
headers = {"content-type": "application/json"}
r = requests.post(url, data=payload, headers=headers)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print



#-------------------------------------------------------------------
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- POST /api/signup')
url = 'https://ols80.herokuapp.com/api/signup'
print('DATA --- username: user1234, password: Abcdefg@12, confirmpassword: Abcdefg@12')
payload = json.dumps({'username': 'user1234', 'password': 'Abcdefg@12', 'confirmpassword': 'Abcdefg@12'})
headers = {"content-type": "application/json"}
r = requests.post(url, data=payload, headers=headers)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print

#----------------------------------------------------------------------
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- POST /api/signup')
url = 'https://ols80.herokuapp.com/api/signup'
print('DATA --- username: user1234, password: Abcdefg@12, confirmpassword: Abcdefg@12')
payload = json.dumps({'username': 'user1234', 'password': 'Abcdefg@12', 'confirmpassword': 'Abcdefg@12'})
headers = {"content-type": "application/json"}
r = requests.post(url, data=payload, headers=headers)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print


print('---------------------------------API TOKEN AUTH------------------------')
#------------------------------------------------------------------------------
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- POST /api/authenticate')
url = 'https://ols80.herokuapp.com/api/authenticate'
print('DATA --- username: user1234')
payload = json.dumps({'username': 'user1234'})
headers = {"content-type": "application/json"}
r = requests.post(url, data=payload, headers=headers)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print


#------------------------------------------------------------------------------
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- POST /api/authenticate')
url = 'https://ols80.herokuapp.com/api/authenticate'
print('DATA --- username: user1234, password: Abcdefg@12')
payload = json.dumps({'username': 'user1234', 'password': 'Abcdefg@12'})
headers = {"content-type": "application/json"}
r = requests.post(url, data=payload, headers=headers)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
token = str(r.content)
time.sleep(2)
print
print

print('---------------------------------LOGIN------------------------')
#------------------------------------------------------------------------------
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- POST /api/login')
url = 'https://ols80.herokuapp.com/api/login'
print('DATA --- username: user1234')
payload = json.dumps({'username': 'user1234'})
print('HEADERS ---content-type": application/json, token: token')
headers = {"content-type": "application/json", "token": token}
r = requests.post(url, data=payload, headers=headers)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print

#------------------------------------------------------------------------------
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- POST /api/login')
url = 'https://ols80.herokuapp.com/api/login'
print('DATA --- username: user1234, password: Abcdefg@12')
payload = json.dumps({'username': 'user1234', 'password': 'Abcdefg@12'})
print('HEADERS --- content-type: application/json, token: token')
headers = {"content-type": "application/json", "token": token}
r = requests.post(url, data=payload, headers=headers)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print


print('---------------------------------POST PRODUCTS IN DATABASE------------------------')
#------------------------------------------------------------------------------
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- POST /api/product')
url = 'https://ols80.herokuapp.com/api/product'
print('HEADERS --- content-type: application/json, token: token')
headers = {"content-type": "application/json", "token": token}
print('DATA --- name: toothrush, category: dailycare, quantity: 50, price: 500, saleprice: 200, details: [{ technicalDetails: { dimension: 20X20, weight=: 20g }, additionalDetails: { seller: Mohan } }], description: A simple toothbrush')
payload = json.dumps({"name": "toothrush", "category": "dailycare", "quantity": 50, "price": 500, "saleprice": "200", "details": [{ "technicalDetails": { "dimension": "20X20", "weight": "20g" }, "additionalDetails": { "seller": "Mohan" } }], "description": "A simple toothbrush"})
r = requests.post(url, headers=headers, data=payload)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print

#------------------------------------------------------------------------------
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- POST /api/product')
url = 'https://ols80.herokuapp.com/api/product'
print('HEADERS --- content-type: application/json, token: token')
headers = {"content-type": "application/json", "token": token}
print('DATA --- name: camera, category: electronics, quantity: 50, saleprice: 200, details: [{ technicalDetails: { dimension: 20X20, weight=: 20g }, additionalDetails: { seller: Mohan } }], description: A simple camera')
payload = json.dumps({"name": "camera", "category": "electronics", "quantity": 50, "saleprice": "200", "details": [{ "technicalDetails": { "dimension": "20X20", "weight": "20g" }, "additionalDetails": { "seller": "Mohan" } }], "description": "A simple camera"})
r = requests.post(url, headers=headers, data=payload)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print

#------------------------------------------------------------------------------
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- POST /api/product')
url = 'https://ols80.herokuapp.com/api/product'
print('HEADERS --- content-type: application/json, token: token')
headers = {"content-type": "application/json", "token": token}
print('DATA --- name: camera, category: electronics, price: 500, saleprice: 200, details: [{ technicalDetails: { dimension: 20X20, weight=: 20g }, additionalDetails: { seller: Mohan } }], description: A simple camera')
payload = json.dumps({"name": "camera", "category": "electronics","price":500, "saleprice": "200", "details": [{ "technicalDetails": { "dimension": "20X20", "weight": "20g" }, "additionalDetails": { "seller": "Mohan" } }], "description": "A simple camera"})
r = requests.post(url, headers=headers, data=payload)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print

#------------------------------------------------------------------------------
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- POST /api/product')
url = 'https://ols80.herokuapp.com/api/product'
print('HEADERS --- content-type: application/json, token: token')
headers = {"content-type": "application/json", "token": token}
print('DATA --- name: camera, category: electronics, quantity: 10, price: 500, saleprice: 200, details: [{ technicalDetails: { dimension: 20X20, weight=: 120g }, additionalDetails: { seller: VS Electronics } }], description: A simple camera')
payload = json.dumps({"name": "camera", "category": "electronics", "quantity": 10, "price":500, "saleprice": "200", "details": [{ "technicalDetails": { "dimension": "20X20", "weight": "20g" }, "additionalDetails": { "seller": "VS Electronics" } }], "description": "A simple camera"})
r = requests.post(url, headers=headers, data=payload)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print

print('---------------------------------GET ALL PRODUCTS------------------------')
#------------------------------------------------------------------------------
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- GET /api/product')
url = 'https://ols80.herokuapp.com/api/product'
print('HEADERS --- content-type: application/json')
headers = {"content-type": "application/json"}
r = requests.get(url, headers=headers)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print

#------------------------------------------------------------------------------
print('GET ALL PRODUCTS')
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- GET /api/product')
url = 'https://ols80.herokuapp.com/api/product'
print('HEADERS --- content-type: application/json, token: token')
headers = {"content-type": "application/json", "token": token}
r = requests.get(url, headers=headers)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print

#------------------------------------------------------------------------------
print('GET ALL PRODUCTS BY LIMIT')
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- GET /api/product')
url = 'https://ols80.herokuapp.com/api/product'
print('HEADERS --- content-type: application/json, token: token')
headers = {"content-type": "application/json", "token": token}
print('PARAMS --- limit: 3')
params={'limit': 3}
r = requests.get(url, headers=headers, params=params)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print

#------------------------------------------------------------------------------
print('GET ALL PRODUCTS BY CATEGORY')
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- GET /api/product')
url = 'https://ols80.herokuapp.com/api/product'
print('HEADERS --- content-type: application/json')
headers = {"content-type": "application/json"}
print('PARAMS --- category: electronics')
params={'category': 'electronics'}
r = requests.get(url, headers=headers, params=params)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print

#------------------------------------------------------------------------------
print('GET ALL PRODUCTS BY CATEGORY')
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- GET /api/product')
url = 'https://ols80.herokuapp.com/api/product'
print('HEADERS --- content-type: application/json, token: token')
headers = {"content-type": "application/json", "token": token}
print('PARAMS --- category: electronics')
params={'category': 'electronics'}
r = requests.get(url, headers=headers, params=params)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print

print('---------------------------------DELETE BY CATEGORY PRODUCTS------------------------')

#------------------------------------------------------------------------------
print('DELETE ALL PRODUCTS BY CATEGORY')
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- DELETE /api/product')
url = 'https://ols80.herokuapp.com/api/product'
print('HEADERS --- content-type: application/json, token: token')
headers = {"content-type": "application/json", "token": token}
print('PARAMS --- category: electronics')
params={'category': 'electronics'}
r = requests.delete(url, headers=headers, params=params)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print

print('DELETE ALL PRODUCTS BY CATEGORY')
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- DELETE /api/product')
url = 'https://ols80.herokuapp.com/api/product'
print('HEADERS --- content-type: application/json, token: token')
headers = {"content-type": "application/json", "token": token}
print('PARAMS --- category: day care')
params={'category': 'day care'}
r = requests.delete(url, headers=headers, params=params)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print


print('---------------------------------DELETE BY NAME AND ID PRODUCTS------------------------')
#------------------------------------------------------------------------------
print('DELETE ALL PRODUCTS BY NAME')
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- DELETE /api/product')
url = 'https://ols80.herokuapp.com/api/product'
print('HEADERS --- content-type: application/json, token: token')
headers = {"content-type": "application/json", "token": token}
print('PARAMS --- name: camera')
params={'name': 'camera'}
r = requests.delete(url, headers=headers, params=params)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print

#------------------------------------------------------------------------------
print('DELETE PRODUCT BY ID')
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- DELETE /api/product')
url = 'https://ols80.herokuapp.com/api/product'
print('HEADERS --- content-type: application/json, token: token')
headers = {"content-type": "application/json", "token": token}
print('PARAMS --- _id: 597cf3619240206f7b23580a')
params={'_id': 'ObjectId("597cf3619240206f7b23580a")'}
r = requests.delete(url, headers=headers, params=params)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print


print('--------------------------------ERROR404------------------------')

#------------------------------------------------------------------------------
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- PUT /api/productvdjkbsjkdh')
url = 'https://ols80.herokuapp.com/api/productdfadfafa'
print('HEADERS --- content-type: application/json, token: token')
headers = {"content-type": "application/json", "token": token}
r = requests.get(url, headers=headers)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print


print('--------------------------------LOGOUT------------------------')

#------------------------------------------------------------------------------
count = count + 1
print('Execution Step ' + str(count))
time.sleep(2)
print('URL --- POST /api/logout')
url = 'https://ols80.herokuapp.com/api/logout'
print('HEADERS --- content-type: application/json, token: token')
headers = {"content-type": "application/json", "token": token}
r = requests.get(url, headers=headers)
print('RESPONSE --- ' + str(r.status_code) + ' ' + str(r.content))
time.sleep(2)
print
print


