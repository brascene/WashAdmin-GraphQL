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
    
    @IBAction func backButton(_ sender: UIBarButtonItem) {
        self.backButtonCustom()
    }
    //@IBOutlet weak var loader: UIActivityIndicatorView!
    
    var loader = UIActivityIndicatorView()
    private let refreshControl = UIRefreshControl()
    
    var allOrders: [OrderDetails] = [] {
        didSet {
            tableView.reloadData()
        }
    }
    
    var ordersWatcher: GraphQLQueryWatcher<AllOrdersQuery>?
    
    @IBOutlet weak var tableView: UITableView!
    
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
        
        refreshControl.tintColor = UIColor(red:0.25, green:0.72, blue:0.85, alpha:1.0)
        refreshControl.attributedTitle = NSAttributedString(string: "Nove narudzbe ...")


        // Do any additional setup after loading the view.
        self.title = "Lista narudžbi"
        
        self.tableView.delegate = self
        self.tableView.dataSource = self
        
        let cellNib = UINib(nibName: "OrdeListTableViewCell", bundle: nil)
        self.tableView.register(cellNib, forCellReuseIdentifier: "OrdeListTableViewCell")
        self.tableView.separatorStyle = .none
        self.tableView.allowsSelection = false
        
        self.automaticallyAdjustsScrollViewInsets = false
        
        // Loader
        
        loader.frame = CGRect(x: 0, y: 0, width: 66, height: 66)
        loader.activityIndicatorViewStyle = .gray
        loader.color = UIColor.black
        loader.startAnimating()
        
        self.tableView.backgroundView = loader
        
        self.tableView.refreshControl = refreshControl
        self.tableView.refreshControl?.addTarget(self, action: #selector(self.refreshOrders(refreshControl:)), for: .valueChanged)
        
        // All orders
        
        fetchAllOrders()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        fetchAllOrders()
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

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
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

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
