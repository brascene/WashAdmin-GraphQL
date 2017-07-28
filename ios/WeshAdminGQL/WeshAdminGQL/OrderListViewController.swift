//
//  OrderListViewController.swift
//  WeshAdminGQL
//
//  Created by Dino Pelic on 7/23/17.
//  Copyright © 2017 Dino Pelic. All rights reserved.
//

import UIKit
import Apollo

class OrderListViewController: UIViewController, UITableViewDelegate, UITableViewDataSource, OrderListCellOutput {
    
    var loader = UIActivityIndicatorView()
    let refreshControl = UIRefreshControl()
    
    var allOrders: [OrderDetails] = [] {
        didSet {
            tableView.reloadData()
        }
    }
    
    var ordersWatcher: GraphQLQueryWatcher<AllOrdersQuery>?
    
    @IBOutlet weak var tableView: UITableView!
    
    @IBAction func backButton(_ sender: UIBarButtonItem) {
        self.backButtonCustom()
    }
    
    deinit {
        ordersWatcher?.cancel()
    }
    
    func whichButtonClicked(statusButton: UIButton, orderId: String) {
            let currentTitle = statusButton.currentTitle
            let changeOrderStatusMutation = ChangeOrderStatusMutation(orderId: orderId, newStatus: currentTitle!)
            apollo.perform(mutation: changeOrderStatusMutation) { [weak self] result, error in
                
                if let error = error {
                    print(error.localizedDescription)
                    return
                }
                                
                if (result?.data?.changeOrderStatus)! {
                    apollo.fetch(query: AllOrdersQuery(), cachePolicy: .fetchIgnoringCacheData)
                    print("Status promijenjen")
                    self?.tableView.reloadData()
                }
            }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
    
        self.title = "Lista narudžbi"
        
        setupComponents()
        fetchAllOrders()
    }
    
    func setupComponents() {
        // Table
        tableView.delegate = self
        tableView.dataSource = self
        tableView.register(UINib(nibName: "OrdeListTableViewCell", bundle: nil), forCellReuseIdentifier: "OrdeListTableViewCell")
        tableView.separatorStyle = .none
        tableView.allowsSelection = false
        tableView.backgroundView = loader
        tableView.refreshControl = refreshControl
        tableView.refreshControl?.addTarget(self, action: #selector(self.refreshOrders(refreshControl:)), for: .valueChanged)
        self.automaticallyAdjustsScrollViewInsets = false
        
        //Loader
        loader.frame = CGRect(x: 0, y: 0, width: 66, height: 66)
        loader.activityIndicatorViewStyle = .gray
        loader.color = UIColor.black
        loader.startAnimating()
        
        // Refresh
        refreshControl.tintColor = UIColor(red:0.25, green:0.72, blue:0.85, alpha:1.0)
        refreshControl.attributedTitle = NSAttributedString(string: "Nove narudzbe ...")
    }
    
    func refreshOrders(refreshControl: UIRefreshControl) {
        apollo.fetch(query: AllOrdersQuery(), cachePolicy: .fetchIgnoringCacheData)
        self.tableView.reloadData()
        refreshControl.endRefreshing()
    }
    
    func backButtonCustom() {
        self.navigationController?.popViewController(animated: true)
        apollo.fetch(query: AllOrdersQuery(), cachePolicy: .fetchIgnoringCacheData)
    }
    
    func fetchAllOrders() {
        let allOrdersQuery = AllOrdersQuery()
        ordersWatcher = apollo.watch(query: allOrdersQuery) {
            [weak self] result, error in
            guard let allOrders = result?.data?.orders else { return }
            self?.allOrders = allOrders.map { ($0?.fragments.orderDetails)! }
            
            // Stop the indicator
            self?.loader.stopAnimating()
            self?.loader.hidesWhenStopped = true
            self?.tableView.reloadData()
        }
    }
    
    // Table setup
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return allOrders.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "OrdeListTableViewCell", for: indexPath) as! OrdeListTableViewCell
        cell.singleOrder = allOrders[indexPath.row]
        cell.output = self
        return cell
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 330
    }
}
