//
//  WelcomeScreenViewController.swift
//  WeshAdminGQL
//
//  Created by Dino Pelic on 7/23/17.
//  Copyright © 2017 Dino Pelic. All rights reserved.
//

import UIKit

class WelcomeScreenViewController: UIViewController {

    @IBOutlet weak var orderListBtn: UIButton!
        
    override func viewDidLoad() {
        super.viewDidLoad()

        self.orderListBtn.addTarget(self, action: #selector(self.goToList), for: .touchUpInside)
        self.title = "Početna"
    }
    
    func goToList() {
        let OrderListStoryboard: UIStoryboard = UIStoryboard(name: "OrderList", bundle: nil)
        let nextController = OrderListStoryboard.instantiateViewController(withIdentifier: "OrderListViewController") as! OrderListViewController
        self.navigationController?.pushViewController(nextController, animated: true)
    }
}
