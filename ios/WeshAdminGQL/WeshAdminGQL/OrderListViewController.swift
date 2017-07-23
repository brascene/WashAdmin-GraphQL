//
//  OrderListViewController.swift
//  WeshAdminGQL
//
//  Created by Dino Pelic on 7/23/17.
//  Copyright © 2017 Dino Pelic. All rights reserved.
//

import UIKit
import Apollo

class OrderListViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    var allOrders: [OrderDetails] = [] {
        didSet {
            tableView.reloadData()
        }
    }

    @IBOutlet weak var tableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.title = "Lista narudžbi"
        
        self.tableView.delegate = self
        self.tableView.dataSource = self
        
        let cellNib = UINib(nibName: "OrdeListTableViewCell", bundle: nil)
        self.tableView.register(cellNib, forCellReuseIdentifier: "OrdeListTableViewCell")
        self.tableView.separatorStyle = .none
        
        // All orders
        
        let allOrdersQuery = AllOrdersQuery()
        apollo.fetch(query: allOrdersQuery) {
            [weak self] result, error in
            guard let allOrders = result?.data?.orders else { return }
            self?.allOrders = allOrders.map { ($0?.fragments.orderDetails)! }
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
