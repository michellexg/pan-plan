from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountRepository

client = TestClient(app)

account_out = {
    "id": 1,
    "username": "user"
}

accounts = [account_out]


class MockAccount:
    def get_all_accounts(self):
        return accounts


def test_accounts_list():
    app.dependency_overrides[AccountRepository] = MockAccount
    response = client.get('/accounts')

    assert response.status_code == 200
    assert response.json() == {'accounts': accounts}


app.dependency_overrides = {}
