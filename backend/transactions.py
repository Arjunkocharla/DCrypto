# transactions.py

from firebase_admin import firestore

from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import firebase_admin
from firebase_admin import credentials, firestore
import requests
from collections import defaultdict

price_url = "https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd"

def add_transaction(db, data):
    transactions_ref = db.collection('transaction')
    
    new_transaction = {
        'name': data.get('name', 'Default Symbol'),
        'symbol': data.get('symbol', 'Default Symbol'),
        'type': data.get('type', 'Buy'),
        'value_usd': data.get('value_usd'),
        'purchased_price': data.get('purchased_price'),
        'date': firestore.SERVER_TIMESTAMP,
        'coins': data.get('coins'),
        'status': data.get('status', 'active'),
        'createdBy': data.get('createdBy', 'Default Creator'),
        'userId': data.get('userId', 'Default UserID')
    }

    required_fields = ['value_usd', 'purchased_price', 'coins', 'userId']
    for field in required_fields:
        if new_transaction[field] is None:
            return f'Error: Field {field} is required.', 400
    
    # Add a new document and retrieve the document ID
    transaction_ref = transactions_ref.add(new_transaction)
    transaction_id = transaction_ref[1].id
    
    return f'Added new transaction with ID: {transaction_id}', 201

def get_transactions(db, userId):
    try:
        # Adjust the query to include filtering by userId
        transactions = db.collection('transaction').where('userId', '==', userId).where('status', '!=', 'delete').stream()
        transactions_list = [{**doc.to_dict(), 'id': doc.id} for doc in transactions]
        return transactions_list, 200
    except Exception as e:
        return f'An error occurred: {e}', 500
    


def get_coin_wise_details(db, userId, filter_symbol=None):
    try:
        # Fetch transactions where `status` is not 'delete' and `userId` matches
        transactions = db.collection('transaction').where('userId', '==', userId).where('status', '!=', 'delete').stream()

        collection = defaultdict(lambda: {"coins": 0, "total_value": 0})

        for doc in transactions:
            transaction = doc.to_dict()
            coin = transaction['symbol']
            transaction_type = transaction['type']
            transaction_value = transaction['value_usd']
            transaction_coins = transaction['coins']

            if filter_symbol and coin.lower() != filter_symbol.lower():
                continue
            
            if transaction_type.lower() == "buy":
                collection[coin]["coins"] += transaction_coins
                collection[coin]["total_value"] += transaction_value
            elif transaction_type.lower() == "sell":
                collection[coin]["coins"] -= transaction_coins
                collection[coin]["total_value"] -= transaction_value

        if filter_symbol:
            filtered_result = { filter_symbol: collection.get(filter_symbol.upper(), {"coins": 0, "total_value": 0}) }
            return filtered_result
        else:
            return collection
    except Exception as e:
        return f'An error occurred: {e}', 500